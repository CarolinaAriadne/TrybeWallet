export const LOGIN = 'LOGIN';
export const DESPESAS = 'DESPESAS';

export const sendEmailuser = (email) => ({
  type: LOGIN,
  payload: email,
});

export const sendExpenses = (retornoApi, estadosLocais) => ({
  type: DESPESAS,
  retornoApi,
  estadosLocais,
});

export const fetchApiTotal = (estadosLocais) => async (dispatch) => { // thunk
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const retornoApiTotal = await request.json();
    dispatch(sendExpenses(retornoApiTotal, estadosLocais));
  } catch (error) {
    console.error(error.message);
  }
};

// function para definir action, que recebe como parâmetro o email que será digitado pelo usuário no input. Defino o type, e a carta (payload), neste caso, é o email, que é  de fato a informação descritiva da action.
