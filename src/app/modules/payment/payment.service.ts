import config from '../../config';
import { Booking } from '../booking/booking.model';
// import { verifyPayment } from './payment.utils';

const confirmationService = async (
  transactionId: string,
  status: string,
  paidStatus: string,
) => {
  try {
    // const verifyResponse = await verifyPayment(transactionId);
    console.log(status);

    if (status === 'success') {
      await Booking.findOneAndUpdate(
        { transactionId },
        {
          paidStatus:
            paidStatus === 'full-paid'
              ? 'full-paid'
              : paidStatus === 'initial-paid'
              ? 'initial-paid'
              : 'no-paid',
        },
        { new: true },
      );
    }

    const successTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .success {
              color: #4CAF50;
            }
            .cancel {
              color: #f44336;
            }
            .redirect-link {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              color: #fff;
            }
            .success-link {
              background-color: #4CAF50;
            }
            .cancel-link {
              background-color: #f44336;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="${status === 'success' ? 'success' : 'cancel'}">
              Payment ${status === 'success' ? 'Successful' : 'Canceled'}
            </h1>
            <a href="${config.client_url}/dashboard/my-rental-paid" class="redirect-link ${status === 'success' ? 'success-link' : 'cancel-link'}">
              ${status === 'success' ? 'Go to Dashboard' : 'Retry Payment'}
            </a>
          </div>
        </body>
      </html>
    `;

    return successTemplate;
  } catch (error) {
    console.error('Error in confirmationService:', error);
    throw new Error('Payment verification failed.');
  }
};

export const PaymentServices = {
  confirmationService,
};
