import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  try{
    const ticketTypeId = req.body.ticketTypeId as number;
    const { userId } = req;
    const createdTicket = await ticketsService.insertTicket(ticketTypeId, userId);
    res.status(201).send(createdTicket);
  }catch(err) {
    if(err.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

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
