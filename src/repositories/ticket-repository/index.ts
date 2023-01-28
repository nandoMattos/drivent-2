import { prisma } from "@/config";
import { PrismaPromise, Ticket, TicketType } from "@prisma/client";

function findManyByUserId(userId: number): PrismaPromise<Ticket> {
  return prisma.ticket.findFirst(
    // { include: { TicketType: true } },
    { where: { Enrollment: { userId } } }
  );
}

function findMany(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository =  {
  findManyByUserId,
  findMany,
};

export default ticketsRepository;
