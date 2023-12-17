import { IsEmail, Length } from "class-validator";

export class SignupInput {
  @IsEmail()
  email: string;

  @Length(6, 32)
  password: string;

  @Length(10, 13)
  phone: string;

  @Length(2, 5)
  country_code: string;
}
