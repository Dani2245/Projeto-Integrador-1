import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export type RegisterState = Readonly<typeof initialState>;

// Ações

export const handleRegister = createAsyncThunk(
  'register/create_account',
  async (data: {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    langKey?: string
  }) => axios.post<any>('api/register', data),
  {
    serializeError: serializeAxiosError,
  }
);

export const RegisterSlice = createSlice({
  name: 'register',
  initialState: initialState as RegisterState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleRegister.pending, state => {
        state.loading = true;
      })
      .addCase(handleRegister.rejected, (state, action) => ({
        ...initialState,
        registrationFailure: true,
        errorMessage: action.error.message,
      }))
      .addCase(handleRegister.fulfilled, () => ({
        ...initialState,
        registrationSuccess: true,
        successMessage: 'Registro salvo! Por favor, verifique seu e-mail para confirmação. Se não receber o e-mail, entrar em contato pelo telefone (12) 98821-2594.',
      }));
  },
});

export const {reset} = RegisterSlice.actions;

// Redutor
export default RegisterSlice.reducer;
