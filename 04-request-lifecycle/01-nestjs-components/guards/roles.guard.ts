import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isAdminUserRole = request.headers["x-role"] === 'admin';

    if (!isAdminUserRole) throw new ForbiddenException('Доступ запрещён: требуется роль admin')
    
    return isAdminUserRole;
  }
}
