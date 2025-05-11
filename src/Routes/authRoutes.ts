import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import USER from "../Schema/userSchema";
import { signToken, verifyToken } from "../Utils/jwtUtils";
import { console } from "inspector";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}


const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const existingUser = await USER.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new USER({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = signToken(newUser._id.toString());
    res
      .status(201)
      .json({
        token,
        user: { id: newUser._id, name: newUser.username, email: newUser.email },
      });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const user = await USER.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = signToken(user._id.toString());
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, name: user.username, email: user.email },
      });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.post("/verify", async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ message: "Please provide a token" });
      return;
    }

    const decoded = verifyToken(token) as DecodedToken;
    if (!decoded) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }
    const user = await USER.findById(decoded.id);
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    

    res.status(200).json({
        user: { id: user._id, name: user.username, email: user.email },
    });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

export default router;
