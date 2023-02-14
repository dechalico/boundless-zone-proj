export default class Account {
  Id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.Id = id;
    this.password = password;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
