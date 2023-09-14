import { NextFunction, Request, Response } from "express";

export default function Index(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} request on ${req.path}`);
  next();
  console.log(`Got a ${res.statusCode} response`);
}
