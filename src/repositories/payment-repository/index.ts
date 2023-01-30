import { prisma } from "@/config";
import { Payment } from "@prisma/client";

function insertOne(payment: CreatePaymentParams) {
  return prisma.payment.create({ data: payment });
}

function findOneByTicketId(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
  insertOne,
  findOneByTicketId,
};

export default paymentRepository;
