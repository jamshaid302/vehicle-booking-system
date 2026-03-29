import { User } from "./auth.model";
import { IAuth } from "./auth.interface";

export const createUser = async (payload: Partial<IAuth>) => {
  return await User.create(payload);
};

export const findOne = async (email: string) => {
  return await User.findOne({
    email,
  });
};
