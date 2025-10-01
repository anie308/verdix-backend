import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env"

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role?: string }
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null
  if (!token) return res.status(401).json({ message: "Missing token" })
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string; role?: string }
    req.user = { id: payload.sub, role: payload.role }
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

