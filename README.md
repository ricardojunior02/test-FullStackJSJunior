# Contele fullstack-junior

## Inicialização

Para Iniciar o projeto basta rodar yarn ou npm install, o gerenciador de pacotes que preferir
E após o termino da instalação basta rodar yarn dev ou npm run dev para a aplicação começar a rodar

## Testando

No repositório existe um arquivo para importação no insomnia ou postman, para auxiliar no teste.

## Endpoints

### GET /api/v1/users

Não recebe nenhum parametro, e retorna todos os usuários existentes no banco

### GET /api/v1/users/:user_id

#### Parâmetros

Recebe o parametro :user_id do usuário a ser encontrado.

#### Respostas

Caso o usuário exista você recebera um status code 200 com o objeto do usuário do qual forneceu o id.
Caso não exista a resposta sera um status code 400 com uma mensagem de erro

### POST /api/v1/users

#### Parâmetros

Recebe um body com informaçoes do usuário a ser criado, como email e password

#### Respostas

Caso os dados sejam válidos a resposta será um status code 201 e o objeto do usuário criado.
Caso os dados não sejam válidos a resposta será um status code 400 e uma mensagem de erro.

### PUT api/v1/users/:user_id

#### Parâmetros

Recebe o parametro :user_id do usuário a ser atualizado.
Recebe um body com informaçoes opcionais do usuário a ser atualizado, como email, old_password e new_password

#### Respostas

Caso os dados sejam válidos a resposta será um status code 201 e o objeto do usuário atualizado.
Caso os dados não sejam válidos ou o usuário não exista a resposta será um status code 400 e uma mensagem de erro.

### DELETE /api/v1/users/:user_id

#### Parâmetros

Recebe o parametro :user_id do usuário a ser deletado.

#### Respostas

Caso o usuário exista e seja excuido com sucesso, você recebera um status code 200 sem corpo.
Caso o usuário não exista você recebera um status code 400 e uma mensagem de erro.

### DELETE /api/v1/users

#### Parâmetros

Não recebe nenhum parâmetro

#### Respostas

Caso exista usuários cadastrados e tenha sucesso ao excluir todos, você recebera um status code 200.
Caso não exista nehum usuário você recebera um status code 400 e uma msg de erro.

## Observações

No arquivo users.json já existem 3 usuários cadastrados, as passwords caso queira utlizar algum deles são 123456 para todos os users.
