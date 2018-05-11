export class Contact {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private _id: number,
    // tslint:disable-next-line:variable-name
    private _firstName: string,
    // tslint:disable-next-line:variable-name
    private _lastName: string,
    // tslint:disable-next-line:variable-name
    private _email: string,
    // tslint:disable-next-line:variable-name
    private _phoneNumber: string
  ) {
    this.id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.phoneNumber = _phoneNumber;
  }
}
