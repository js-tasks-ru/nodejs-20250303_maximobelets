import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status || 400;

    let message: string = 'Database error';

    if (exception instanceof mongoose.Error.ValidationError) {
      message = 'Validation error message'
    }

    if (exception instanceof mongoose.mongo.MongoError) {
       message = 'Duplicate key error'
    }

    response.status(status).json({
      error: "Bad Request",
      statusCode: status,
      message: message,
    });
  }
}

