import {Entity, model, property} from '@loopback/repository';

@model()
export class Icon extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  _id?: number;

  @property({
    type: 'string',
  })
  Data?: string;


  constructor(data?: Partial<Icon>) {
    super(data);
  }
}
