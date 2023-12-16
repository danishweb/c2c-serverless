import { UserRepository } from "app/repository/user.repository";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: `Hello World`,
        data: {},
      }),
    };
  }
}
