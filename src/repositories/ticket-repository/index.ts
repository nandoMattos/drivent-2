import { prisma } from "@/config";

function findMany() {
  return prisma.ticketType.findMany();
}

const ticketsRepository =  {
  findMany,
};

export default ticketsRepository;
