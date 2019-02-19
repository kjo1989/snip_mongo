export class UserModel {
  name: string;
  email: string;
  password: string;
  token?: string;
  status?: boolean;
  create_at: any;


  constructor(name, email, password, regConfirmed) {
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
    this.token = this.token || '';
    this.status =  this.status || false;
    this.create_at = this.create_at || '';
  }
}
