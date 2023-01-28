import { getTicketTypes, getUserTickets, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import ticketSchema from "@/schemas/tickets-schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.
  all("/*", authenticateToken).
  post("/", validateBody(ticketSchema), postTicket).
  get("/", getUserTickets).
  get("/types", getTicketTypes);

export { ticketsRouter };
