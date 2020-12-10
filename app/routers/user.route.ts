'use strict';
import UserController from '../controller/user.controller';
const $ = new UserController();

module.exports = (Router: any): void => {
  Router.post('/user/login', $.login);
};
