import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { schemaStore, schemaUpdate} from '../utils/validate';

const pathToUser = path.resolve(__dirname, '..', 'users.json');

class UserController {
  async index(req, res){
    const users = JSON.parse(await fs.promises.readFile(pathToUser));

    const usersdata = users.map(user =>{
      delete user.password;
      return user;
    })

    return res.status(200).json(usersdata)
  }

  async show(req, res){
    const { user_id } = req.params;

    const users = JSON.parse(await fs.promises.readFile(pathToUser));

    const userData = users.filter(user => user.id === user_id);

    if(userData.length === 0){
      return res.status(400).json({ erro: 'Usuário não existe'});
    }

    delete userData[0].password;

    return res.status(200).json(userData[0])
  }

  async store(req, res){
    const { email, password } = req.body;

    try {
      await schemaStore.validate({ email, password })
    } catch (error) {
      return res.status(400).json({ erro_no_campo: error.path, msg: error.errors })
    }
    
    const usersData = JSON.parse(await fs.promises.readFile(pathToUser));
    
    const emailExists = usersData.filter(user => user.email === email);

    if(emailExists.length > 0){
      return res.status(400).json({ erro: 'E-mail já existe'})
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const data = {
      id: v4(),
      email,
      password: passwordHash
    }

    const newDataUsers = [...usersData, data]

    await fs.promises.writeFile(pathToUser, JSON.stringify(newDataUsers));

    return res.status(201).json({
      email: data.email
    });
  }
  
  async update(req, res){
    const { user_id } = req.params;
    const { email, old_password, new_password } = req.body;

    const newData = {};

    newData.id = user_id;

    const users = JSON.parse(await fs.promises.readFile(pathToUser));
    const userData = users.filter((user) => user.id === user_id);
    const index = users.indexOf(userData[0], 0);

    if(userData.length == 0){
      return res.status(400).json({ erro: 'Usuário não existe'});
    }

    const emailExists = users.filter(user => user.email === email);

    if(emailExists.length > 0){
      return res.status(400).json({ erro: 'E-mail já existe'})
    }

    try {
      await schemaUpdate.validate({email, old_password, new_password});
    } catch (error) {
      return res.status(400).json({ erro_no_campo: error.path, msg:  error.errors});
    }
    
    newData.email = email || userData[0].email;
    
    if(old_password){
      const compare = await bcrypt.compare(old_password, userData[0].password);
      if(!compare){
        return res.status(400).json({ erro: 'Forneça sua senha atual correta para atualiza-la'});
      }
    
      const passwordHash = await bcrypt.hash(new_password, 8);
      newData.password = passwordHash;
      
    }else{
      newData.password = userData[0].password;
    }

    users.splice(index, 1, newData);

    await fs.promises.writeFile(pathToUser, JSON.stringify(users));

    return res.status(200).json({
      email: newData.email
    });
  }

  async destroy(req, res){
    const { user_id } = req.params;

    const users = JSON.parse(await fs.promises.readFile(pathToUser));

    const userData = users.filter((user) => user.id === user_id);

    if(userData.length === 0){
      return res.status(400).json({ erro: 'Usuário não existe'})
    }

    const index = users.indexOf(userData[0], 0);

    users.splice(index, 1);

    await fs.promises.writeFile(pathToUser, JSON.stringify(users));

    return res.status(200).send();
  }
}

export default new UserController();