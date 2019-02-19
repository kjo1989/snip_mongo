import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {User, LoginData, Responce, VerifyData} from '../models';
import {UserRepository} from '../repositories';
import {generateToken} from "../middlewares/tokenGenerator";
import {sendEmail} from "../middlewares/sendEmail";


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async create(@requestBody() user: User): Promise<Responce> {

      let responce = new Responce();

      const foundFromBaseData = await this.userRepository.findOne({where: {email: user.email}});

      if (user.email === (foundFromBaseData && foundFromBaseData.email)) {
          responce.isError = true;

          responce.responceStatusCode = 404;

          responce.responceMessage = 'There is already registered user with this email';

          return await responce;
      }
      else {
          const bcrypt_Nodejs = require('bcrypt-nodejs');
          const user_pswd_hash = bcrypt_Nodejs.hashSync(user.password);
          const pug = require('pug');
          const path = require('path');

          let verify_token_key = generateToken();

           let ObjectId = require('mongodb').ObjectID;

           // let months = ['January', 'Febraury', 'March', 'APril', 'May', 'June', 'July', 'August',
           // 'September', 'October', 'November', 'December'];
           //
           // let create_at = `${new Date().getFullYear()} - ${months[new Date().getMonth()]} - ${new Date().getDate()}, at ${new Date().getHours()} : ${new Date().getMinutes()}`;


          let registeredUser = {
              _id: ObjectId.index,
              name: user.name,
              email: user.email,
              password: user_pswd_hash,
              verify_token_key: verify_token_key,
              status: user.status,
              create_at: new Date().toLocaleDateString()
          };

          await this.userRepository.create(registeredUser);
          console.log(this.userRepository.count());

          let get_token_link = '/?token_key=' + verify_token_key;


          let urlLink = 'http://localhost:4200/verify' + get_token_link;

          let inputData = {
              username: user.name,
              urlLink: urlLink
          };

          const htm = pug.renderFile(path.join(__filename, '../../../../public/template.pug'), inputData);

          console.log(htm);

          sendEmail('sssargsyan1987@gmail.com', 'rzdpttjssindgzvf', 'rzdpttjssindgzvf', registeredUser.email, htm);

          responce.responceData = registeredUser;

          responce.isError = false;

          responce.responceStatusCode = 200;

          responce.responceMessage = 'Registration was succesfully';

          return await responce;
      }
  }

    @post('/users/sign_in', {
        responses: {
            '200': {
                description: 'User logining',
                content: {'application/json': {schema: {'x-ts-type': User}}},
            }
        }
    })

    async login(@requestBody() data: LoginData): Promise<Responce> {

      let responce = new Responce();

        console.log(data);

        const bcrypt_Nodejs = require('bcrypt-nodejs');

        const jwt = require('jsonwebtoken');

        this.transformData([data.email, data.password]);

        const loggedUser = await this.userRepository.findOne({where: {email: data.email}});

        if (loggedUser) {
            if (loggedUser.status) {
                if (bcrypt_Nodejs.compareSync(data && data.password, loggedUser.password)) {
                    let token = jwt.sign({
                        id: loggedUser._id,
                        name: loggedUser.name,
                        email: loggedUser.email,
                        password: loggedUser.password
                    },'secret_token_key');

                    delete data.email;
                    delete data.password;

                    responce.responceData = token;
                    responce.isError = false;
                    responce.responceStatusCode = 200;
                    responce.responceMessage = 'Logging was succesfully';

                    console.log(loggedUser && loggedUser.email);

                    return await responce;
                }
                else {
                    responce.isError = true;
                    responce.responceStatusCode = 404;
                    responce.responceMessage = 'Wrong passwword';
                    return await responce;
                }
            }
            else {
                responce.isError = true;
                responce.responceStatusCode = 401;
                responce.responceMessage = 'Send You an Email for activation?';
                return await responce;
            }
        }

        else {
            responce.isError = true;
            responce.responceStatusCode = 404;
            responce.responceMessage =  'Where is no such as customer';
            return await responce
        }
    }

    @post('/users/verify', {
        responses: {
            '200': {
                description: 'User veryfing',
                content: {'application/json': {schema: {'x-ts-type': User}}},
            }
        }
    })
    async verify(@requestBody() data: VerifyData): Promise<Responce> {
        const responce = new Responce();

        const verifiedUser = await this.userRepository.findOne({where: {verify_token_key: data.queryParams}});

        if (verifiedUser) {
            let  updatedByID = {
                status: !verifiedUser.status
            };

            await this.userRepository.updateById(verifiedUser._id, updatedByID);
            //  console.log('update',a );
            responce.responceData = verifiedUser;

            responce.isError = false;

            responce.responceStatusCode = 200;

            responce.responceMessage = 'Verification was successfull';

            return await responce;
        }

        else {
            responce.isError = true;

            responce.responceStatusCode = 404;

            responce.responceMessage = 'Verification was unsuccessfull.' +
                'Please, verify Your Email';
            return await responce;
        }

    }



  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

    transformData(data: string[] | any[]): void {
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].toLowerCase();
        }
    }
}
