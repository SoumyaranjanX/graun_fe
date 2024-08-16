import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '@/assets/scss/profile/stripeFormStyle.css';
import { useNavigate } from 'react-router-dom';
import setRestaurantPaymentOnboard from '@/services/dispatch/api/setRestaurantPaymentOnboard';

interface CheckoutFormProps {
  setShowDetails: (show: boolean) => void;
}

export default function CheckoutForm({ setShowDetails }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const id = localStorage.getItem('id');

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: setPayment } = setRestaurantPaymentOnboard();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent && paymentIntent.status) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.log('Card Element not found');
        setIsLoading(false);
        return;
      }

      // Create PaymentMethod
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          address: {
            country: 'GB',
          },
        },
      });

      if (paymentMethodError) {
        if (paymentMethodError.code === 'card_declined' && paymentMethodError.decline_code === 'country_not_supported') {
          setMessage('This card cannot be processed because it is not issued in the UK.');
        } else {
          setMessage(paymentMethodError.message || 'An error occurred while creating the payment method.');
        }
        setMessage(paymentMethodError.message || 'An error occurred while creating the payment method.');
        return;
      }
      localStorage.setItem('paymentMethod', paymentMethod.id);
      const exp_month = paymentMethod.card?.exp_month;
      const exp_year = paymentMethod.card?.exp_year;
      const last4 = paymentMethod.card?.last4;
      const brand = paymentMethod.card?.brand;

      if (localStorage.getItem('paymentMethod') != null) {
        const payment = localStorage.getItem('paymentMethod');
        console.log('payment id:' + payment);
        setPayment(
          { token_id: payment, exp_month, exp_year, brand, last4 },
          {
            onSuccess: () => {
              setMessage('Payment succeeded!');
              setShowDetails(true);
              setIsLoading(false);
              localStorage.setItem('exp_month', exp_month?.toString() || '');
              localStorage.setItem('exp_year', exp_year?.toString() || '');
              localStorage.setItem('last4', last4 || '');
              localStorage.setItem('brand', brand || '');
              console.log('Payment Method ID:', paymentMethod.id);
              fetch(
                'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: id,
                    currentTrack: 4,
                  }),
                },
              );
            },
          },
        );
      } else {
        setMessage('Payment failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" className="formStripe" onSubmit={handleSubmit}>
      <CardElement id="card-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="buttonStripe">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Submit Details'}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
