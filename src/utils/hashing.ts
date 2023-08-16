import bcrypt from "bcrypt";
import { CommonMessages } from "../constants/messages";

export const createHash = async (plainText) => {
  try {
    return await bcrypt.hash(plainText, 12);
  } catch {
    throw new Error(CommonMessages.SOMETHING_WENT_WRONG);
  }
};

export const compareHash = async (plainText, hashedText) => {
  try {
    return await bcrypt.compare(plainText, hashedText);
  } catch {
    throw new Error(CommonMessages.SOMETHING_WENT_WRONG);
  }
};
