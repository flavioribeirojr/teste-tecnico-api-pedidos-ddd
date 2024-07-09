import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

export class ExpressRequestBodyValidator {
  getValidationHandler(schema: z.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(422).json({ errors: err.errors });
          return;
        }

        res.status(500).send(err);
      }
    };
  }
}