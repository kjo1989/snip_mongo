import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './snipicons-db.datasource.json';

export class SnipiconsDbDataSource extends juggler.DataSource {
  static dataSourceName = 'snipiconsDb';

  constructor(
    @inject('datasources.config.snipiconsDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
    this.connect(((err, result) => console.log(result)));
  }
}
