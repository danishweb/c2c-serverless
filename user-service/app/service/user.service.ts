import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { autoInjectable } from "tsyringe";
import { SignupInput } from "../models/dto/signupInput";
import { UserRepository } from "../repository/user.repository";
import { AppValidationError } from "../utility/dto-errors";
import { PostgresErrorCodes } from "../utility/errorcodes";
import { GetHashedPassword, GetSalt } from "../utility/password";
import {
  DuplicateRecordErrorResponse,
  ErrorResponse,
  SucessResponse,
} from "../utility/response-handler";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);

      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);

      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        salt,
        phone: input.phone,
        country_code: input.country_code,
        user_type: "BUYER",
      });

      return SucessResponse(data);
    } catch (error) {
      if (error.code === PostgresErrorCodes.DuplicateRecord)
        return DuplicateRecordErrorResponse("User already exists!");
      return ErrorResponse(500, error);
    }
  }
}
