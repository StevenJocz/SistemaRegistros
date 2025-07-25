import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export function generarToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
}

export function verificarToken(token: string) {
  return jwt.verify(token, SECRET);
}