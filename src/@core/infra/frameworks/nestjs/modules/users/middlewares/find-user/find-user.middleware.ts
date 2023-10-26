import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { NextFunction, Request, Response } from 'express';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';

@Injectable()
export class FindUserMiddleware implements NestMiddleware {
	constructor(private findByIdUseCase: FindByIdUseCase) {}

	async use(req: Request, res: Response, next: NextFunction) {
		try {
			await this.findByIdUseCase.execute(req.params.id);
			next();
		} catch (error) {
			return res.status(404).json({
				message: 'User not found',
				status_code: HttpStatus.NOT_FOUND,
			});
		}
	}
}
