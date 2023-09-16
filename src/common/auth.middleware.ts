import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify, JwtPayload } from 'jsonwebtoken';

interface JwtPayloadLocal extends JwtPayload {
	email: string;
}

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					req.user = (payload as JwtPayloadLocal).email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
