import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: Request, res: Response) {
  try{
    const ticketTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch(error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
