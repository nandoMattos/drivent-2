import { prisma } from "@/config";
import { Payment } from "@prisma/client";

function insertOne(payment: CreatePaymentParams) {
  return prisma.payment.create({ data: payment });
}

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
  insertOne,
};

export default paymentRepository;
