import { getTicketTypes, getUserTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.
  all("/*", authenticateToken).
  get("/", getUserTickets).
  get("/types", getTicketTypes);

export { ticketsRouter };
