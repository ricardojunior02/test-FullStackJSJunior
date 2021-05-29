import { Router } from 'express';
import usersController from './controllers/UserController';
import deleteAllUsersController from './controllers/DeleteAllUsersController';

const route = Router();

route.get('/api/v1/users', usersController.index);
route.get('/api/v1/users/:user_id', usersController.show);
route.post('/api/v1/users', usersController.store);
route.put('/api/v1/users/:user_id', usersController.update);
route.delete('/api/v1/users/:user_id', usersController.destroy);

route.delete('/api/v1/users', deleteAllUsersController.destroy);

export default route;

