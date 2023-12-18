import { APIGatewayProxyResultV2 } from "aws-lambda";

interface ApiResponse {
  message: string;
  data?: unknown;
}

const formatResponse = (
  statusCode: number,
  message: string,
  data?: unknown,
  cookies?: string[]
): APIGatewayProxyResultV2 => {
  let response: ApiResponse = { message };

  if (data) response.data = data;

  let apiResponse: APIGatewayProxyResultV2 = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(response),
  };

  if (cookies && cookies.length > 0) apiResponse.cookies = cookies;

  return apiResponse;
};

export const SucessResponse = (data: object, cookies?: string[]) =>
  formatResponse(200, "success", data, cookies);

export const ErrorResponse = (code = 1000, error: unknown) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const errorMessage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occurred";
    return formatResponse(code, errorMessage);
  }

  return formatResponse(code, `${error}`);
};

export const DuplicateRecordErrorResponse = (message: string) =>
  formatResponse(409, message);
