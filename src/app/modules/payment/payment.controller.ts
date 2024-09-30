import { Request, Response } from 'express';
import { PaymentServices } from './payment.service';

const confirmationController = async (req: Request, res: Response) => {
  try {
    const result = await PaymentServices.confirmationService(
      req.query.transactionId as string,
      req.query.status as string,
      req.query.paidStatus as string,
    );
    res.send(result);
  } catch (error) {
    console.error('Error in confirmationController:', JSON.stringify(error));
    res.status(500).send('An error occurred while processing the payment.');
  }
};

export const PaymentController = {
  confirmationController,
};
