import database from "./database";
import Account from "../models/repository/account";
import Result from "../models/result";

export async function create(
  account: Account
): Promise<Result<Account | undefined>> {
  try {
    const connection = await database();
    let query = `insert user_accounts (firstname,lastname,username,password) values (?,?,?,?)`;
    const result = await connection.query(query, [
      account.firstName,
      account.lastName,
      account.username,
      account.password,
    ]);
    // update the created id
    account.Id = result.insertId;
    return new Result<Account>(account, true, "account successfully created");
  } catch (err: any) {
    return new Result<undefined>(
      undefined,
      false,
      "An error occured when creating user account",
      err
    );
  }
}

export async function getByUsername(
  username: string
): Promise<Result<Account | undefined>> {
  try {
    const connection = await database();
    let query = "select * from user_accounts where username = ?";
    const results: Array<any> = await connection.query(query, [username]);
    if (results.length === 0) {
      return new Result<undefined>(
        undefined,
        false,
        "Can't find user account by username"
      );
    }
    const data = results[0];
    return new Result<Account>(
      new Account(
        data.id,
        data.firstname,
        data.lastname,
        data.username,
        data.password
      ),
      true,
      "Successfully get user account by username"
    );
  } catch (err: any) {
    return new Result<undefined>(
      undefined,
      false,
      "An error occured when getting account by username",
      err
    );
  }
}

export async function getAll(): Promise<Result<Account[] | undefined>> {
  try {
    const connection = await database();
    let query = "select * from user_accounts";
    const results: Array<any> = await connection.query(query);
    const mappedResults: Account[] = results.map((data) => {
      return new Account(
        data.id,
        data.firstname,
        data.lastname,
        data.username,
        data.password
      );
    });
    return new Result<Account[]>(
      mappedResults,
      true,
      "Successfully get all user accounts"
    );
  } catch (err: any) {
    return new Result<undefined>(
      undefined,
      false,
      "An error occured when getting all user account",
      err
    );
  }
}
