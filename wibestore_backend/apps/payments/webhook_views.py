"""
WibeStore Backend - Payment Webhook Views
Handle webhooks from payment providers.
"""

import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from apps.payments.models import Transaction
from apps.payments.providers import get_payment_provider, PaymentStatus

logger = logging.getLogger("apps.payments")


@csrf_exempt
@require_http_methods(["POST"])
def payme_webhook(request):
    """Handle Payme webhooks."""
    try:
        import json
        payload = json.loads(request.body)
        signature = request.headers.get("X-Payme-Signature", "")
        
        provider = get_payment_provider("payme")
        result = provider.process_webhook(payload, signature)
        
        if result.status == PaymentStatus.SUCCESS:
            # Update transaction
            order_id = payload.get("account", {}).get("order_id")
            if order_id:
                try:
                    transaction = Transaction.objects.get(order_id=order_id)
                    transaction.status = "completed"
                    transaction.provider_transaction_id = result.transaction_id
                    transaction.save()
                    
                    # Send notification
                    from apps.notifications.services import NotificationService
                    NotificationService.create_transaction_notification(
                        user=transaction.user,
                        transaction=transaction,
                        status="success"
                    )
                except Transaction.DoesNotExist:
                    logger.error(f"Transaction not found: {order_id}")
        
        return JsonResponse({
            "status": result.status.value,
            "transaction_id": result.transaction_id,
        })
        
    except Exception as e:
        logger.error(f"Payme webhook error: {e}")
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def click_webhook(request):
    """Handle Click webhooks."""
    try:
        import json
        payload = json.loads(request.body)
        signature = request.headers.get("X-Click-Signature", "")
        
        provider = get_payment_provider("click")
        result = provider.process_webhook(payload, signature)
        
        if result.status == PaymentStatus.SUCCESS:
            order_id = payload.get("merchant_trans_id")
            if order_id:
                try:
                    transaction = Transaction.objects.get(order_id=order_id)
                    transaction.status = "completed"
                    transaction.provider_transaction_id = result.transaction_id
                    transaction.save()
                    
                    from apps.notifications.services import NotificationService
                    NotificationService.create_transaction_notification(
                        user=transaction.user,
                        transaction=transaction,
                        status="success"
                    )
                except Transaction.DoesNotExist:
                    logger.error(f"Transaction not found: {order_id}")
        
        return JsonResponse({
            "status": result.status.value,
            "transaction_id": result.transaction_id,
        })
        
    except Exception as e:
        logger.error(f"Click webhook error: {e}")
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def paynet_webhook(request):
    """Handle Paynet webhooks."""
    try:
        import json
        payload = json.loads(request.body)
        signature = request.headers.get("X-Paynet-Signature", "")
        
        provider = get_payment_provider("paynet")
        result = provider.process_webhook(payload, signature)
        
        if result.status == PaymentStatus.SUCCESS:
            order_id = payload.get("order_id")
            if order_id:
                try:
                    transaction = Transaction.objects.get(order_id=order_id)
                    transaction.status = "completed"
                    transaction.provider_transaction_id = result.transaction_id
                    transaction.save()
                    
                    from apps.notifications.services import NotificationService
                    NotificationService.create_transaction_notification(
                        user=transaction.user,
                        transaction=transaction,
                        status="success"
                    )
                except Transaction.DoesNotExist:
                    logger.error(f"Transaction not found: {order_id}")
        
        return JsonResponse({
            "status": result.status.value,
            "transaction_id": result.transaction_id,
        })
        
    except Exception as e:
        logger.error(f"Paynet webhook error: {e}")
        return JsonResponse({"error": str(e)}, status=500)
