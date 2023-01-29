import { postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import paymentSchema from "@/schemas/payment-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.
  all("/*", authenticateToken).
  post("/process", validateBody(paymentSchema), postPayment).
  get("/", (req, res) => res.send("oi"));

export default paymentsRouter;
