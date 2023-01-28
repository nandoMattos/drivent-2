import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { CreateTicketParams } from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";

async function insertTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }

  const ticketType = await ticketsRepository.findTicketTypeById(ticketTypeId);
  if(!ticketType) {
    throw notFoundError();
  }

  const newTicket: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: "RESERVED"
  };

  return await ticketsRepository.createOne(newTicket);
}

async function getTicketByUserId(userId: number): Promise<Ticket> {
  const userTicket =  await ticketsRepository.findOneByUserId(userId);
  if(!userTicket) {
    throw notFoundError();
  }

  return userTicket;
}

async function getAllTicketTypes(): Promise<TicketType[]> {
  return await ticketsRepository.findMany();
}

const ticketsService = {
  insertTicket,
  getTicketByUserId,
  getAllTicketTypes,
}; 

export default ticketsService;
