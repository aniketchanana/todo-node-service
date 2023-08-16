export const isUpdateAllowed = (updateObj, allowedKeys: string[]): boolean => {
  return Object.keys(updateObj).every((parameterName) =>
    allowedKeys.includes(parameterName)
  );
};
