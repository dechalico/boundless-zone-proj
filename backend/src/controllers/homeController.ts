import { Request, Response } from "express";
import {
  createValidation,
  loginValidation,
} from "../validations/accountValidation";
import {
  create as createUser,
  getByUsername,
  getAll as getAllAcounts,
} from "../repository/user_account";
import Account from "../models/repository/account";
import hashedPassword from "../utils/hashedPassword";
import { createToken, verifyToken } from "../utils/jwt";

const register = async (req: Request, res: Response) => {
  const { error, value } = createValidation.validate(req.body);
  if (error) {
    return res.json({
      success: false,
      data: undefined,
      message: error.message,
    });
  }

  const result = await createUser(
    new Account(
      0,
      value.firstname,
      value.lastname,
      value.username,
      hashedPassword(value.password)
    )
  );

  if (!result.success || result.result === undefined) {
    return res.json({
      success: false,
      data: undefined,
      message: result.message,
    });
  }

  res.json({
    success: true,
    data: {
      firstname: result.result.firstName,
      lastname: result.result.lastName,
      username: result.result.username,
    },
    message: "successfully register user account",
  });
};

const login = async (req: Request, res: Response) => {
  const { error, value } = loginValidation.validate(req.body);
  if (error) {
    return res.json({
      success: false,
      data: undefined,
      message: error.message,
    });
  }

  var result = await getByUsername(value.username);
  if (!result.success || result.result === undefined) {
    return res.json({
      success: false,
      data: undefined,
      message: "Invalid username or password",
    });
  }

  // validate password
  const password = hashedPassword(value.password);
  if (password !== result.result.password) {
    return res.json({
      success: false,
      data: undefined,
      message: "Invalid username or password",
    });
  }

  // generate token
  var token = createToken({ username: result.result.username });
  res.json({
    success: true,
    data: token,
    message: "Account successfully signin",
  });
};

const account = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Unable to authenticate" });
  }
  const verify = verifyToken(token);
  if (!verify.success || verify.result === undefined) {
    return res.json({ success: false, message: "Unable to authenticate" });
  }
  const obj = JSON.parse(JSON.stringify(verify.result));

  const result = await getByUsername(obj.username);
  if (!result.success || result.result === undefined) {
    return res.json({
      success: false,
      data: undefined,
      message: "Unable to determine the account",
    });
  }

  const allAccounts = await getAllAcounts();
  if (!allAccounts.success) {
    return res.json({
      success: false,
      data: undefined,
      message: "An error occured. Please try again later",
    });
  }

  res.json({
    success: true,
    data: {
      profile: {
        firstName: result.result.firstName,
        lastName: result.result.lastName,
        username: result.result.username,
      },
      accounts: allAccounts.result,
    },
    message: "Successfully get account details",
  });
};

export default {
  register,
  login,
  account,
};
