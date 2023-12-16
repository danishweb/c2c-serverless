import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";

const service = new UserService(new UserRepository());

export const Signup = async (event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
};
