import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { UserInstance } from "../model/userModel";
import { loginSchema, registerSchema } from "../utils/validation";
import {
  cookieTimeout,
  generateSignature,
  hashPassword,
  verifyPassword,
} from "../utils/services/helper";
import { excludeProperty } from "../utils/services/service";
import { UserAttributes } from "../utils/constant/interface";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      repeat_password,
      phoneNumber,
    } = req.body;

    const birth_year = dateOfBirth.split("-")[2];

    const { error } = registerSchema.validate({
      userName,
      firstName,
      lastName,
      birth_year,
      email,
      password,
      repeat_password,
    });

    if (error) {
      return res.status(400).json({
        status: `error`,
        method: req.method,
        message: error.message,
      });
    }

    const isExisting = await UserInstance.findOne({
      where: { email: email },
    });

    if (isExisting) {
      return res.status(400).json({
        status: "error",
        method: req.method,
        message: `user already exists`
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = (await UserInstance.create({
      id: v4(),
      userName,
      firstName,
      lastName,
      dateOfBirth,
      email,
      password: hashedPassword,
      phoneNumber,
    })) as unknown as UserAttributes;

    if (!user) {
      return res.status(400).json({
        status: `error`,
        method: req.method,
        message: `user not successfully created`,
      });
    }

    const token = generateSignature({ email: email, id: user.id });

    const keysToExclude = ["password", "id"];
    const updatedUser = excludeProperty(user, keysToExclude);

    const updatedUserDetails = excludeProperty(
      updatedUser._previousDataValues,
      keysToExclude
    );

    res.cookie("token", token, {
      expires: cookieTimeout(),
    });

    return res.status(200).json({
      status: `success`,
      method: req.method,
      message: `user successfully created`,
      data: updatedUserDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      status: `error`,
      method: req.method,
      message: error.message,
    });
  }
  const user = (await UserInstance.findOne({
    where: { email: email },
  })) as unknown as UserAttributes;

  if (!user) {
    return res.status(400).json({
      status: `error`,
      method: req.method,
      message: `you are not a registered user`
    });
  }

  const validatePassword = await verifyPassword(password, user.password);

  if (!validatePassword) {
    return res.status(404).json({
      status: `error`,
      message:`Invalid email or password`
    });
  }

  const token = await generateSignature({
    id: user.id,
    email: user.email,
  });

  res.cookie(`token`, token, {
    expires: cookieTimeout(),
  });

  return res.status(200).json({
    status: `success`,
    message: `User logged in successfully`
  });
};
