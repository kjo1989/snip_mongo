import {Entity, model, property} from '@loopback/repository';

@model()
export class LoginData extends Entity {
  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'string',
  })
  msg?: string;

  @property({
    type: 'number',
    id: true,
  })
  id?: number;


  constructor(data?: Partial<LoginData>) {
    super(data);
  }
}
