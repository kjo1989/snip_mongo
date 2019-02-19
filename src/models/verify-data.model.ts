import {Entity, model, property} from '@loopback/repository';

@model()
export class VerifyData extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  queryParams?: string;


  constructor(data?: Partial<VerifyData>) {
    super(data);
  }
}
