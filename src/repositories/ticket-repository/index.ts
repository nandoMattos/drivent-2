import { prisma } from "@/config";
import { PrismaPromise, Ticket, TicketType } from "@prisma/client";

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" |"updatedAt"> 
async function createOne(newTicket: CreateTicketParams) {
  return prisma.ticket.create({ data: newTicket, include: { TicketType: true } });
}

async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

async function findById(id: number) {
  return prisma.ticket.findFirst({ where: { id }, include: { TicketType: true } });
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

function updateStatusToPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

const ticketsRepository =  {
  createOne,
  findTicketTypeById,
  findById,
  findOneByUserId,
  findMany,
  updateStatusToPaid
};

export default ticketsRepository;
