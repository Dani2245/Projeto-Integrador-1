import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {defaultValue, IAgendamento} from 'app/shared/model/agendamento.model';

const initialState: EntityState<IAgendamento> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'api/agendamentos';

// Actions

export const getEntities = createAsyncThunk('agendamento/fetch_entity_list', async ({
                                                                                      page,
                                                                                      size,
                                                                                      sort
                                                                                    }: IQueryParams) => {
  const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}`;
  return axios.get<IAgendamento[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'agendamento/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IAgendamento>(requestUrl);
  },
  {serializeError: serializeAxiosError}
);

export const createEntity = createAsyncThunk(
  'agendamento/create_entity',
  async (entity: IAgendamento, thunkAPI) => {
    const result = await axios.post<IAgendamento>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  {serializeError: serializeAxiosError}
);

export const updateEntity = createAsyncThunk(
  'agendamento/update_entity',
  async (entity: IAgendamento, thunkAPI) => {
    const result = await axios.put<IAgendamento>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  {serializeError: serializeAxiosError}
);

export const partialUpdateEntity = createAsyncThunk(
  'agendamento/partial_update_entity',
  async (entity: IAgendamento, thunkAPI) => {
    const result = await axios.patch<IAgendamento>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  {serializeError: serializeAxiosError}
);

export const deleteEntity = createAsyncThunk(
  'agendamento/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IAgendamento>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  {serializeError: serializeAxiosError}
);

// slice

export const AgendamentoSlice = createEntitySlice({
  name: 'agendamento',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const {data} = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const {reset} = AgendamentoSlice.actions;

// Reducer
export default AgendamentoSlice.reducer;
