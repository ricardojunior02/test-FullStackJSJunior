import * as Yup from 'yup';

const schemaStore = Yup.object().shape({
  email: Yup.string().email('Forneça um endereço de e-mail válido')
    .required(),
  password: Yup.string().required().min(6, 'Sua senha deve conter no mínimo 6 caracteres')
});

const schemaUpdate = Yup.object().shape({
  email: Yup.string().email('Forneça um formato de e-mail válido'),
  old_password: Yup.string(),
  new_password: Yup.string().min(6, 'Você deve fornecer uma senha de no mínimo 6 caracteres')
  .when('old_password', (old_password, field) =>
    old_password ? field.required('Forneça uma nova senha para atualizar') : field
  ),
});

export {
  schemaStore,
  schemaUpdate
}