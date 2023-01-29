import { notFoundError } from "@/errors";
import { PaymentBody } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository, { CreatePaymentParams } from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import enrollmentsService from "../enrollments-service";

async function processPayment(userId: number, payment: PaymentBody) {
  const ticketExists = await ticketsRepository.findById(payment.ticketId);
  if(!ticketExists || ticketExists.status === "PAID") {
    throw notFoundError();
  }

  const userHasEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!userHasEnrollment) {
    throw notFoundError();
  }
  
  const paymentToInsert: CreatePaymentParams =  {
    ticketId: payment.ticketId,
    value: ticketExists.TicketType.price,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: ((payment.cardData.number).toString()).slice(-4),
  };

  await enrollmentsService.ticketBelongsToUser(userId, payment.ticketId);
  const paymentDone = await paymentRepository.insertOne(paymentToInsert);
  if(paymentDone) {
    await ticketsRepository.updateStatusToPaid(paymentToInsert.ticketId);
  }
  return paymentDone;
}

const paymentService = {
  processPayment,
};

export default paymentService;
