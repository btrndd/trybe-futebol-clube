// import * as jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { readFileSync } from 'fs';
// import HttpException from '../interfaces/HttpException';
// import EError from '../interfaces/EError';

// const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     const error = new HttpException(EError.notAuthorized, 'Token not found');
//     throw error;
//   }
//   try {
//     const decoded = jwt.verify(
//       token,
//       JWT_SECRET,
//       { algorithms: ['HS256'] },
//     );
//     res.locals.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// export default { auth };
