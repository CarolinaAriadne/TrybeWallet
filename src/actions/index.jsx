export const LOGIN = 'LOGIN';

export const sendEmailuser = (email) => ({
  type: LOGIN,
  payload: email,
});

// function para definir action, que recebe como parâmetro o email que será digitado pelo usuário no input. Defino o type, e a carta (payload), neste caso, é o email, que é  de fato a informação descritiva da action.
