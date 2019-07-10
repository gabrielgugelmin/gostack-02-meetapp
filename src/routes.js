import { Router } from 'express';
import UserController from './app/controllers/User';

const routes = new Router();

routers.get('/users', UserController.store);

export default routes;
