import jwt, { type JwtPayload } from "jsonwebtoken";
import 'dotenv/config';

const jwt_Token = (): string => {
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
        return ""
    }
    return JWT_SECRET
}
export const tokenVerifyService = (token: string) => {
    return jwt.verify(token, jwt_Token()) as JwtPayload
}
