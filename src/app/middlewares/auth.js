import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const secret = authHeader.split(' ')[1];

  // jwt.verify(secret, authConfig.secret, (err, decoded) => {
  //   const { id } = decoded;
  //   if (err) {
  //     return res.status(401).json({ error: 'Invalid token' });
  //   }
  //   res.userId = id;
  //   return next();
  // });

  try {
    const decoded = await promisify(jwt.verify)(secret, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
