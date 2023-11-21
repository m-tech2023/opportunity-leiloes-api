import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Supondo que 'user' seja a propriedade onde as informações do usuário são armazenadas após a autenticação
  },
);
