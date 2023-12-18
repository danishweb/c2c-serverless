import { IsEmail, IsString, Length } from "class-validator";

export class LoginInput {
  @IsEmail()
  email: string;

  @Length(6, 32)
  @IsString()
  password: string;
}
