import { NextFunction, Response, Request } from "express";
import User from "../models/User";

const checkAuth:(req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  let user = await User.findOne({ token });

  console.log(user)
  if (user?.token !== token) {
    return res.status(401).json({ error: 'Wrong Token' });
  }
  const request_name = req.route.stack[req.route.stack.length - 1].name;
  const permissions = user.permissions
  console.log(request_name)
  // Client
  if (permissions?.all) {
    const request_names = ["getGames"]
    if (request_names.includes(request_name)) {
      return next()
    }
  }

  if (permissions?.admin) {
    const request_names = ["updateUser", "getUsers"]
    if (request_names.includes(request_name)) {
      return next()
    }
  }


  // next()

  return res.status(403).send('dont have permision');
};

export default checkAuth
