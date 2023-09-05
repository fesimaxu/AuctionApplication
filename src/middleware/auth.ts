import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../model/userModel";
import { verifySignature } from "../utils/services/helper";
import { excludeProperty } from "../utils/services/service";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
   
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }

    const decoded: any = await verifySignature(token);

    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token or user doesn't exist",
      });
    }

    const user = await UserInstance.findOne( { where : {email: decoded.email} });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User with that token no longer exist",
      });
    }

    res.locals.user = excludeProperty(user, ["password"]);

    next();
  } catch (err: any) {
    next(err);
  }
};
