import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketByUserId(userId: number): Promise<Ticket> {
  const userTicket =  await ticketsRepository.findManyByUserId(userId);
  if(!userTicket) {
    throw notFoundError();
  }

  return userTicket;
}

async function getAllTicketTypes(): Promise<TicketType[]> {
  return await ticketsRepository.findMany();
}

const ticketsService = {
  getTicketByUserId,
  getAllTicketTypes,
}; 

export default ticketsService;
