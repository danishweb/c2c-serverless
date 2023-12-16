import { SucessResponse } from "../utility/response-handler";

export class UserRepository {
  constructor() {}

  async createAccount() {
    return SucessResponse({
      hello: "world",
    });
  }
}
