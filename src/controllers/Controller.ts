import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export interface Controller<T = void, R = Request> {
  bodySchema?: z.Schema;
  handle: (req: R, res: Response, next: NextFunction) => T;
}