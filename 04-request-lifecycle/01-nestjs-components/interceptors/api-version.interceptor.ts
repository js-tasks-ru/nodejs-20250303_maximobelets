import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const currentTime = Date.now();

    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: `${Date.now() - currentTime}ms`,
      })),
    );
  }
}