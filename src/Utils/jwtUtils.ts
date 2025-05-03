import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (userId: string): string => {
  try{
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }catch(err){
    console.error("Error signing token:", err);
    return "Error signing token";
  }
};


export const verifyToken = (token: string) => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(err){
        return err;
    }
}
