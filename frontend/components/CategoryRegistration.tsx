import { useEffect } from 'react';
import { loadScript } from '@/utils/razorpay';

interface PaymentProps {
  amount: number;
  eventId: string;
  categories: string[];
  onSuccess: () => void;
}

export default function CategoryRegistration({ amount, eventId, categories, onSuccess }: PaymentProps) {
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePayment = async () => {
    try {
      // Create order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, eventId, categories }),
      });
      
      const data = await response.json();
      if (!data.orderId) throw new Error('Failed to create order');

      // Initialize Razorpay
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Event Registration',
        description: 'Registration Fee',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              onSuccess();
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
        },
        theme: {
          color: '#141f29',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
    >
      Pay and Register
    </button>
  );
}