import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import register, { handleRegister, reset } from './register.reducer';

describe('Testes de criação de conta', () => {
  const initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null,
    successMessage: null,
  };

  it('deve retornar o estado inicial', () => {
    expect(register(undefined, { type: '' })).toEqual({
      ...initialState,
    });
  });

  it('deve detectar uma requisição', () => {
    expect(register(undefined, { type: handleRegister.pending.type })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('deve lidar com o RESET', () => {
    expect(
      register({ loading: true, registrationSuccess: true, registrationFailure: true, errorMessage: '', successMessage: '' }, reset())
    ).toEqual({
      ...initialState,
    });
  });

  it('deve lidar com o sucesso do CREATE_ACCOUNT', () => {
    expect(
      register(undefined, {
        type: handleRegister.fulfilled.type,
        payload: 'fake payload',
      })
    ).toEqual({
      ...initialState,
      registrationSuccess: true,
      successMessage: 'Registro salvo! Por favor, verifique seu e-mail para confirmação.',
    });
  });

  it('deve lidar com a falha do CREATE_ACCOUNT', () => {
    const error = { message: 'fake error' };
    expect(
      register(undefined, {
        type: handleRegister.rejected.type,
        error,
      })
    ).toEqual({
      ...initialState,
      registrationFailure: true,
      errorMessage: error.message,
    });
  });

  describe('Ações', () => {
    let store;

    const resolvedObject = { value: 'qualquer coisa' };
    beforeEach(() => {
      const mockStore = configureStore([thunk]);
      store = mockStore({});
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('despacha as ações CREATE_ACCOUNT_PENDING e CREATE_ACCOUNT_FULFILLED', async () => {
      const expectedActions = [
        {
          type: handleRegister.pending.type,
        },
        {
          type: handleRegister.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(handleRegister({ login: '',
      email: '',
      // phone: '', 
      password: ''
    }));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });
    it('despacha a ação RESET', async () => {
      await store.dispatch(reset());
      expect(store.getActions()[0]).toMatchObject(reset());
    });
  });
});
