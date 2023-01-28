import { prisma } from "@/config";
import { PrismaPromise, Ticket, TicketType } from "@prisma/client";

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" |"updatedAt"> 
async function createOne(newTicket: CreateTicketParams) {
  return prisma.ticket.create({ data: newTicket, include: { TicketType: true } });
}

async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

function findOneByUserId(userId: number): PrismaPromise<Ticket> {
  return prisma.ticket.findFirst(
    { where: 
      { Enrollment: 
        { userId } 
      },
    include: { TicketType: true } }
  );
}

function findMany(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository =  {
  createOne,
  findTicketTypeById,
  findOneByUserId,
  findMany,
};

export default ticketsRepository;
