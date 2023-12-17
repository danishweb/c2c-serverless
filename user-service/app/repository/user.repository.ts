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
}
