import {SnipIconsApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {SnipIconsApplication};

export async function main(options: ApplicationConfig = {}) {
  // const nodemailer = require('nodemailer');
  const app = new SnipIconsApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}