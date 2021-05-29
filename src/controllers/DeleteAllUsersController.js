import fs from 'fs';
import path from 'path';

class DeleteAllUsersController {
  async destroy(req, res){
    const pathToUser = path.resolve(__dirname, '..', 'users.json');

    const users = JSON.parse(await fs.promises.readFile(pathToUser));

    if(users.length == 0){
      return res.status(400).json({ erro: 'Não existe nenhum usuário para ser deletado'})
    }

    users.splice(0, users.length);

    await fs.promises.writeFile(pathToUser, JSON.stringify(users));

    return res.status(200).send();
  }
}


module.exports = new DeleteAllUsersController();