export const isUpdateAllowed = (updateObj, allowedKeys: string[]): boolean => {
  console.log(updateObj);
  return Object.keys(updateObj).every((parameterName) =>
    allowedKeys.includes(parameterName)
  );
};
