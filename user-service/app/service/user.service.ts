import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";
import { UserRepository } from "../repository/user.repository";
import { SignupInput } from "../models/dto/signupInput";
import { plainToClass } from "class-transformer";
import { AppValidationError } from "../utility/dto-errors";
import { ErrorResponse, SucessResponse } from "../utility/response-handler";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    const input = plainToClass(SignupInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(400, error);

    // this.repository.createAccount(input);
    return SucessResponse({
      body: input,
    });
  }
}
