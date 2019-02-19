import {Entity, model, property} from '@loopback/repository';

@model()
export class Responce extends Entity {
  @property({
    type: 'object',
  })
  responceData?: object;

  @property({
    type: 'number',
  })
  responceStatusCode?: number;

  @property({
    type: 'string',
  })
  responceMessage?: string;

  @property({
      type: 'date',
  })
  responceCreatedDate?: string;

  @property({
      type: 'boolean',
  })
  isError?: boolean;

  @property({
      type: 'object'
  })
  responseUploadedFIle?: object;


  constructor(data?: Partial<Responce>) {
    super(data);
  }
}
