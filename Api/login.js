import { sql } from "./db.js";

export class Login {
  async findByEmail(email) {
    const [user] = await sql`
      select * from usuarios where email = ${email}
    `
    return user
  }
}