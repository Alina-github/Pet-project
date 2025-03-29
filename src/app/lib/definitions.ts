import type { JWTPayload } from 'jose';

export interface SessionPayload extends JWTPayload {
  userId: string;
  role: string;
}
