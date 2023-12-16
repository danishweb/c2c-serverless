const formatResponse = (
  statusCode: number,
  message: string,
  data: unknown = null
) => {
  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message,
      ...(data && { data }),
    }),
  };

  return response;
};

export const SucessResponse = (data: object) => {
  return formatResponse(200, "success", data);
};

export const ErrorResponse = (code = 500, error: unknown) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const errorMesssage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occured";
    return formatResponse(code, errorMesssage, errorMesssage);
  }

  return formatResponse(code, `${error}`, error);
};

export const DuplicateRecordErrorResponse = (message: string) => {
  return formatResponse(409, message);
};