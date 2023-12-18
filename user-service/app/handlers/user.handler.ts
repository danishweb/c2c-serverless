import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import bodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from "tsyringe";
import { UserService } from "../service/user.service";

const service = container.resolve(UserService);

export const Signup = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
})
  .use(bodyParser())
  .use(httpErrorHandler());

export const Login = middy((event: APIGatewayProxyEventV2) => {
  return service.UserLogin(event);
})
  .use(bodyParser())
  .use(httpErrorHandler());
