import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Result from "../models/result";

const expired = process.env.TOKEN_EXPIRE;
const tokenSecret: Secret =
  process.env.TOKEN_SECRET || "this is the default secret";

export const createToken = (payload: any): string => {
  const token = jwt.sign(payload, tokenSecret, {
    expiresIn: expired,
  });
  return token;
};

export const verifyToken = (
  token: string
): Result<string | JwtPayload | undefined> => {
  try {
    const decoded = jwt.verify(token, tokenSecret);
    return new Result<string | JwtPayload>(
      decoded,
      true,
      "successfully decoded jwt payload"
    );
  } catch (err: any) {
    return new Result<undefined>(
      undefined,
      false,
      "Invalid or expired token",
      err
    );
  }
};
