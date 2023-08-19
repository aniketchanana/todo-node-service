import { split, trim } from "lodash";
import { GenericObject } from "../common/types";

export const isUpdateAllowed = (updateObj, allowedKeys: string[]): boolean => {
  return Object.keys(updateObj).every((parameterName) =>
    allowedKeys.includes(parameterName)
  );
};

export const parseCookieString = (cookieString): GenericObject => {
  const parsedCookies = {};
  const pairs = split(cookieString, ";");

  pairs.forEach((pair) => {
    const [key, value] = split(pair, "=");
    parsedCookies[trim(key)] = trim(value);
  });

  return parsedCookies;
};
