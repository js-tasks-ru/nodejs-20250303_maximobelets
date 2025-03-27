import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from 'express';

import * as fs from "fs";

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status || 500;
    const timestamp: string = new Date().toISOString();

    const message: string = `[${timestamp}] ${status} - ${exception.message}\n`;

    try {
      fs.appendFileSync('errors.log', message);
    } catch {
      console.log('Something went wrong with the log process');
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: timestamp,
    });
  }
}
