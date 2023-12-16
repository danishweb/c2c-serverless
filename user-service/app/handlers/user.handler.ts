import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from "tsyringe";
import { UserService } from "../service/user.service";

const service = container.resolve(UserService);

export const Signup = async (event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
};
