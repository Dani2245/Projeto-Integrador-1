import {IAgendamento} from 'app/shared/model/agendamento.model';

export interface IServico {
  id?: number;
  nome?: string;
  descricao?: string | null;
  categoria?: string | null;
  preco?: number | null;
  duracao?: number | null;
  agendamento?: IAgendamento | null;
}

export const defaultValue: Readonly<IServico> = {};
