import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import {SnipiconsDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id
> {
  constructor(
    @inject('datasources.snipiconsDb') dataSource: SnipiconsDbDataSource,
  ) {
    super(User, dataSource);
  }

}
