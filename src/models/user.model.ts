import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
    @property({
        type: 'number',
        id: true,
        default: 0
    })
    _id?: number;

  @property({
    type: 'string',
  })
  name?: string;

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
      type: 'string'
  })
  verify_token_key?: string;

  @property({
      type: 'boolean'
  })
  status?: boolean;

    @property({
        type: 'date',
    })
    create_at?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
