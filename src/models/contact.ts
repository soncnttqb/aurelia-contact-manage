export class Contact {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;

  constructor(
    private _id: number,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _phoneNumber: string
  ) {
    this.id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.phoneNumber = _phoneNumber;
  }
}
