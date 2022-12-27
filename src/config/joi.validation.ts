/* eslint-disable prettier/prettier */
import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
    PORT: Joi.required().default(3000),
    USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DATABASE: Joi.required(),
    SYNCRONIZE: Joi.boolean().required(),
    JWT_SECRET_KEY: Joi.string().required()
})
