import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../config/env"
import { ProfileModel } from "../models/profile"
import { UserModel } from "../models/user"

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, full_name, role } = req.body || {}
    if (!email || !password || !username) return res.status(400).json({ message: "Missing fields" })

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) return res.status(409).json({ message: "Email already registered" })
    const existingProfile = await ProfileModel.findOne({ username })
    if (existingProfile) return res.status(409).json({ message: "Username already taken" })

    const passwordHash = await bcrypt.hash(password, 10)
    const profile = await ProfileModel.create({ username, full_name, role: role || "farmer" })
    await UserModel.create({ email, password_hash: passwordHash, profile_id: profile._id })

    const token = jwt.sign({ sub: profile._id.toString(), role: profile.role }, env.jwtSecret as string, { expiresIn: "7d" })
    return res.status(201).json({ access_token: token, user: { id: profile._id, username: profile.username, full_name: profile.full_name, role: profile.role } })
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Registration failed" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: "Missing fields" })

    const user = await UserModel.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ message: "Invalid credentials" })

    const profile = await ProfileModel.findById(user.profile_id)
    if (!profile) return res.status(401).json({ message: "Invalid profile" })

    const token = jwt.sign({ sub: profile._id.toString(), role: profile.role }, env.jwtSecret as string, { expiresIn: "7d" })
    return res.json({ access_token: token, user: { id: profile._id, username: profile.username, full_name: profile.full_name, role: profile.role } })
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Login failed" })
  }
}

export const logout = async (req: Request, res: Response) => {
  return res.json({ success: true })
}
