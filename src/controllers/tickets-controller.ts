import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  try{
    const { userId } = req;
    const userTicket = await ticketsService.getTicketByUserId(userId);
    res.status(200).send(userTicket);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function getTicketTypes(req: Request, res: Response) {
  try{
    const ticketTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch(error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
