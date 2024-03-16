import dayjs from 'dayjs';
import { IServico } from 'app/shared/model/servico.model';
import { IUser } from 'app/shared/model/user.model';

export interface IAgendamento {
  id?: number;
  dataHora?: string | null;
  servico?: IServico | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IAgendamento> = {};
