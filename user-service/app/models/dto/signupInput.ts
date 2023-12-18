import { Length } from "class-validator";
import { LoginInput } from "./loginInput";

export class SignupInput extends LoginInput {
  @Length(10, 13)
  phone: string;

  @Length(2, 5)
  country_code: string;
}
