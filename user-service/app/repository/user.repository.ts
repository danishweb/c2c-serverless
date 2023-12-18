import { UserModel } from "../models/user.model";
import { DBOperation } from "./db.operation";

export class UserRepository extends DBOperation {
  constructor() {
    super();
  }

  async createAccount({
    phone,
    country_code,
    email,
    password,
    salt,
    user_type,
  }: UserModel) {
    const queryString =
      "INSERT INTO users(phone,country_code,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    const values = [phone, country_code, email, password, salt, user_type];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
  }

  async findAccount(email: string) {
    const queryString =
      "SELECT user_id, email, password, phone, country_code, salt, verification_code, expiry FROM users WHERE email = $1";
    const values = [email];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount < 1) {
      throw Error("user does not exists with provided email id!");
    }
    return result.rows[0] as UserModel;
  }
}
