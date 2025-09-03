// src/common/filters/drizzle.exception-filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// A classe de erro específica do driver do PostgreSQL pode não ser exportada diretamente,
// então vamos capturar erros genéricos e verificar suas propriedades.
@Catch()
export class DrizzleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const pgError = exception.cause;

    // Verifica se a exceção é um erro do PostgreSQL com código de violação de unicidade
    if (pgError?.code === '23505') {
      const status = HttpStatus.CONFLICT; // HTTP 409
      const message = this.getFriendlyMessage(pgError.detail);

      response.status(status).json({
        statusCode: status,
        message: message,
        error: 'Conflict',
        errorCode: 'REGISTRY_ALREADY_EXISTS', // Código de erro personalizado para o front-end
      });
    } else {
      // Para todos os outros erros, delega ao manipulador de exceções padrão do NestJS.
      // Você pode expandir isso para tratar outros códigos de erro do DB.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception.message || 'Ocorreu um erro interno no servidor.';

      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }

  /**
   * Extrai uma mensagem mais amigável do detalhe do erro do PostgreSQL.
   * Ex: "Key (email)=(john.doe@example.com) already exists." -> "O e-mail 'john.doe@example.com' já está em uso."
   * @param detail A string de detalhe do erro do PG.
   * @returns Uma mensagem amigável.
   */
  private getFriendlyMessage(detail: string): string {
    if (typeof detail !== 'string') {
      return 'O registro já existe.';
    }

    const match = detail.match(/\((.*?)\)=\((.*?)\)/);
    if (match) {
      const field = match[1];
      const value = match[2];
      // Você pode adicionar traduções ou formatações para campos específicos aqui
      // Ex: if (field === 'fullName') return `O cliente '${value}' já existe.`
      return `O valor '${value}' para o campo '${field}' já existe.`;
    }

    return 'Um dos campos que você está tentando salvar já existe no banco de dados.';
  }
}
