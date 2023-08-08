import { Response } from "express";

type Props = {
  res: Response;
  errorCode: number;
  err: unknown;
  errorMessage: string;
  routeName: string;
  userId?: string;
};
function logErrorAndRespond({
  errorCode,
  err,
  res,
  routeName,
  userId,
  errorMessage,
}: Props) {
  const error = err as Error;
  console.log(
    `error inside ${routeName} for user ${
      userId ?? "No user"
    } and error message is ${error.message}`
  );
  res.status(errorCode).json({ error: errorMessage });
}
export { logErrorAndRespond };
