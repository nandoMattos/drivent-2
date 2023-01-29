import Joi from "joi";

const paymentSchema = Joi.object({
  ticketId: Joi.number().min(1).required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().positive().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required(),
  }).required()
});

export default paymentSchema;
