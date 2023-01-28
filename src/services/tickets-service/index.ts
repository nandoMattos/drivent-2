import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/ticket-repository";

async function getAllTicketTypes() {
  const ticketTypes = await ticketsRepository.findMany();
  if(!ticketTypes) throw notFoundError();
  return ticketTypes;
}

const ticketsService = {
  getAllTicketTypes 
}; 

export default ticketsService;
