"""
WibeStore Backend - Upload Views
Handles image uploads for listings and other media.
"""

import uuid

from django.conf import settings
from django.utils import timezone
from PIL import Image
from rest_framework import parsers, permissions, status, throttling, views
from rest_framework.response import Response

from core.constants import IMAGE_UPLOAD_MAX_SIZE, IMAGE_UPLOAD_MAX_WIDTH, IMAGE_UPLOAD_MAX_HEIGHT


class ImageUploadThrottle(throttling.UserRateThrottle):
    """Rate limiting for image uploads."""
    rate = "20/minute"


class ImageUploadView(views.APIView):
    """
    Upload a single image.
    - Validates file type and size
    - Creates thumbnail
    - Returns image URL
    """

    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [ImageUploadThrottle]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get("image")

        if not image_file:
            return Response(
                {"error": "Изображение не найдено"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate file type
        valid_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if image_file.content_type not in valid_types:
            return Response(
                {"error": "Неверный тип файла. Разрешены: JPEG, PNG, WebP, GIF"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate file size (max 5MB)
        max_size = IMAGE_UPLOAD_MAX_SIZE  # 5MB
        if image_file.size > max_size:
            return Response(
                {"error": f"Размер файла не должен превышать {max_size // (1024 * 1024)}MB"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Validate image dimensions
            img = Image.open(image_file)
            width, height = img.size

            if width > IMAGE_UPLOAD_MAX_WIDTH or height > IMAGE_UPLOAD_MAX_HEIGHT:
                return Response(
                    {
                        "error": f"Изображение слишком большое. Максимум: {IMAGE_UPLOAD_MAX_WIDTH}x{IMAGE_UPLOAD_MAX_HEIGHT}"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Generate unique filename
            ext = image_file.name.split(".")[-1] if "." in image_file.name else "jpg"
            filename = f"{uuid.uuid4().hex}.{ext}"
            filepath = f"uploads/{timezone.now().strftime('%Y/%m/%d')}/{filename}"

            # Save file
            from django.core.files.storage import default_storage

            file_path = default_storage.save(filepath, image_file)
            image_url = default_storage.url(file_path)

            # Create thumbnail
            thumbnail_url = self.create_thumbnail(image_file, filename)

            return Response(
                {
                    "id": uuid.uuid4(),
                    "url": image_url,
                    "thumbnail_url": thumbnail_url,
                    "width": width,
                    "height": height,
                    "size": image_file.size,
                    "content_type": image_file.content_type,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response(
                {"error": f"Ошибка загрузки: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def create_thumbnail(self, image_file, filename):
        """Create a thumbnail for the uploaded image."""
        try:
            img = Image.open(image_file)

            # Convert to RGB if necessary
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            # Create thumbnail (max 400x400)
            thumb_size = (400, 400)
            img.thumbnail(thumb_size, Image.Resampling.LANCZOS)

            # Save thumbnail
            from django.core.files.storage import default_storage
            from io import BytesIO

            thumb_filename = f"thumb_{filename}"
            thumb_filepath = f"uploads/thumbnails/{timezone.now().strftime('%Y/%m/%d')}/{thumb_filename}"

            buffer = BytesIO()
            img.save(buffer, format="JPEG", quality=85)
            buffer.seek(0)

            from django.core.files.uploadedfile import InMemoryUploadedFile

            thumb_file = InMemoryUploadedFile(
                buffer,
                None,
                thumb_filename,
                "image/jpeg",
                buffer.getbuffer().nbytes,
                None,
            )

            file_path = default_storage.save(thumb_filepath, thumb_file)
            return default_storage.url(file_path)

        except Exception:
            # Return original if thumbnail creation fails
            return None


class MultipleImageUploadView(views.APIView):
    """
    Upload multiple images at once.
    Maximum 5 images per request.
    """

    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [ImageUploadThrottle]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist("images")

        if not images:
            return Response(
                {"error": "Изображения не найдены"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Maximum 5 images
        if len(images) > 5:
            return Response(
                {"error": "Максимум 5 изображений за раз"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        results = []
        errors = []

        for i, image_file in enumerate(images):
            # Validate each image
            valid_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
            if image_file.content_type not in valid_types:
                errors.append(
                    {
                        "index": i,
                        "filename": image_file.name,
                        "error": "Неверный тип файла",
                    }
                )
                continue

            if image_file.size > IMAGE_UPLOAD_MAX_SIZE:
                errors.append(
                    {
                        "index": i,
                        "filename": image_file.name,
                        "error": f"Файл слишком большой (макс. {IMAGE_UPLOAD_MAX_SIZE // (1024 * 1024)}MB)",
                    }
                )
                continue

            try:
                img = Image.open(image_file)
                width, height = img.size

                if width > IMAGE_UPLOAD_MAX_WIDTH or height > IMAGE_UPLOAD_MAX_HEIGHT:
                    errors.append(
                        {
                            "index": i,
                            "filename": image_file.name,
                            "error": f"Изображение слишком большое",
                        }
                    )
                    continue

                # Generate unique filename
                ext = image_file.name.split(".")[-1] if "." in image_file.name else "jpg"
                filename = f"{uuid.uuid4().hex}.{ext}"
                filepath = f"uploads/{timezone.now().strftime('%Y/%m/%d')}/{filename}"

                # Save file
                from django.core.files.storage import default_storage

                file_path = default_storage.save(filepath, image_file)
                image_url = default_storage.url(file_path)

                # Create thumbnail
                thumbnail_url = self.create_thumbnail(image_file, filename)

                results.append(
                    {
                        "id": uuid.uuid4(),
                        "url": image_url,
                        "thumbnail_url": thumbnail_url,
                        "width": width,
                        "height": height,
                        "size": image_file.size,
                        "content_type": image_file.content_type,
                    }
                )

            except Exception as e:
                errors.append(
                    {
                        "index": i,
                        "filename": image_file.name,
                        "error": str(e),
                    }
                )

        if not results and errors:
            return Response(
                {"errors": errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "uploaded": results,
                "failed": errors,
                "total_uploaded": len(results),
                "total_failed": len(errors),
            },
            status=status.HTTP_201_CREATED if results else status.HTTP_400_BAD_REQUEST,
        )

    def create_thumbnail(self, image_file, filename):
        """Create a thumbnail for the uploaded image."""
        try:
            img = Image.open(image_file)

            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            thumb_size = (400, 400)
            img.thumbnail(thumb_size, Image.Resampling.LANCZOS)

            from django.core.files.storage import default_storage
            from io import BytesIO

            thumb_filename = f"thumb_{filename}"
            thumb_filepath = f"uploads/thumbnails/{timezone.now().strftime('%Y/%m/%d')}/{thumb_filename}"

            buffer = BytesIO()
            img.save(buffer, format="JPEG", quality=85)
            buffer.seek(0)

            from django.core.files.uploadedfile import InMemoryUploadedFile

            thumb_file = InMemoryUploadedFile(
                buffer,
                None,
                thumb_filename,
                "image/jpeg",
                buffer.getbuffer().nbytes,
                None,
            )

            file_path = default_storage.save(thumb_filepath, thumb_file)
            return default_storage.url(file_path)

        except Exception:
            return None
