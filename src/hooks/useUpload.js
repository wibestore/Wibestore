import { useMutation } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для загрузки изображений
 * Поддерживает множественную загрузку и валидацию
 */
export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file) => {
            // Validate file
            if (!file) {
                throw new Error('Файл не выбран');
            }

            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                throw new Error('Неверный тип файла. Разрешены: JPEG, PNG, WebP, GIF');
            }

            // Check file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('Размер файла не должен превышать 5MB');
            }

            // Create FormData
            const formData = new FormData();
            formData.append('image', file);

            // Upload
            const { data } = await apiClient.post('/upload/image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return data;
        },
        retry: 1,
    });
};

/**
 * Hook для загрузки нескольких изображений
 */
export const useUploadImages = () => {
    const uploadImage = useUploadImage();

    return useMutation({
        mutationFn: async (files) => {
            if (!files || files.length === 0) {
                throw new Error('Файлы не выбраны');
            }

            // Max 5 images per listing
            if (files.length > 5) {
                throw new Error('Максимум 5 изображений на listing');
            }

            // Upload all files sequentially
            const results = [];
            for (const file of files) {
                try {
                    const result = await uploadImage.mutateAsync(file);
                    results.push(result);
                } catch (error) {
                    throw new Error(`Ошибка загрузки ${file.name}: ${error.message}`);
                }
            }

            return results;
        },
    });
};

/**
 * Утилита для сжатия изображения перед загрузкой
 */
export const compressImage = async (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(
                                new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                })
                            );
                        } else {
                            reject(new Error('Ошибка сжатия изображения'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
        };
        reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    });
};
