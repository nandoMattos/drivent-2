import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({ where: { userId } });
}

function findEnrollmentConnectedWithUserAndTicket(userId: number, ticketId: number) {
  return prisma.enrollment.findFirst(
    { where: 
      { userId }, 
    include: 
      { Ticket: 
        { where: { id: ticketId } } 
      }
    }
  );
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollmentByUserId,
  findEnrollmentConnectedWithUserAndTicket
};

export default enrollmentRepository;
