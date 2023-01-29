import { AuthenticatedRequest } from "@/middlewares";
import { PaymentBody } from "@/protocols";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const payment = req.body as PaymentBody;
    const donePayment = await paymentService.processPayment(userId, payment);

    res.status(httpStatus.OK).send(donePayment);
  } catch(err) {
    if(err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    
    if(err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
