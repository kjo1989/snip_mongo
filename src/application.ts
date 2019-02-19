import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {UserRepository} from "./repositories";
import { generateToken} from "./middlewares/tokenGenerator";

export class SnipIconsApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));


    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

      // async migrateSchema(options?: any) {
      //     // 1. Run migration scripts provided by connectors
      //     await super.migrateSchema(options);
      //
      //     // 2. Make further changes. When creating predefined model instances,
      //     // handle the case when these instances already exist.
      //     const userRepo = await this.getRepository(UserRepository);
      //     userRepo.deleteAll(options);
      //     const bcrypt_Nodejs = require('bcrypt-nodejs');
      //     const user_pswd_hash = bcrypt_Nodejs.hashSync("hovo");
      //
      //     let verify_token_key = generateToken();
      //
      //      userRepo.create({
      //          _id: 1,
      //          name: 'Shaxulyan Hovhannes',
      //          email: 'shaxulyan87@gmail.com',
      //          password: user_pswd_hash,
      //          verify_token_key: verify_token_key,
      //          statusActivated: false
      //      });
      // }
}
