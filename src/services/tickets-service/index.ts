import ticketsRepository from "@/repositories/ticket-repository";

async function getAllTicketTypes() {
  return await ticketsRepository.findMany();
}

const ticketsService = {
  getAllTicketTypes 
}; 

export default ticketsService;
