import {DefaultCrudRepository} from '@loopback/repository';
import {Icon} from '../models';
import {SnipiconsDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IconRepository extends DefaultCrudRepository<
  Icon,
  typeof Icon.prototype._id
> {
  constructor(
    @inject('datasources.snipiconsDb') dataSource: SnipiconsDbDataSource,
  ) {
    super(Icon, dataSource);
  }
}
