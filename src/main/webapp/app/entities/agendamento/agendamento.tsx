import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import {TextFormat} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT, APP_HOUR_FORMAT, AUTHORITIES} from 'app/config/constants';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getEntities} from './agendamento.reducer';
import {hasAnyAuthority} from "app/shared/auth/private-route";

export const Agendamento = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const agendamentoList = useAppSelector(state => state.agendamento.entities);
  const currentUser = useAppSelector(state => state.authentication.account);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const loading = useAppSelector(state => state.agendamento.loading);

  // Create a copy of agendamentoList before sorting
  // const sortedAgendamentoList = [...agendamentoList].sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const {match} = props;

  const calculateEndTime = (startTime, duration) => {
  const startTimeDate = new Date(startTime);
  const durationInMilliseconds = parseInt(duration, 10) * 60000; // Convert duration to number
  const endTime = new Date(startTimeDate.getTime() + durationInMilliseconds);
  return endTime;
};

  return (
    <div>
      <h2 id="agendamento-heading" data-cy="AgendamentoHeading">
        Agendamentos
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/> Atualizar lista
          </Button>
          <Link to="/agendamento/new" className="btn btn-primary jh-create-entity" id="jh-create-entity"
                data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus"/>
            &nbsp; Criar Agendamento
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {agendamentoList && agendamentoList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Data Hora</th>
              <th>Serviço</th>
              <th>Cliente</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {agendamentoList.map((agendamento, i) => (
              <tr key={`entity-${i}`} data-cy="entityTable">
                <td>
                  <Button tag={Link} to={`/agendamento/${agendamento.id}`} color="link" size="sm">
                    {agendamento.id}
                  </Button>
                </td>
                <td>{agendamento.dataHora ?
                  <TextFormat type="date" value={agendamento.dataHora} format={APP_DATE_FORMAT}/> : null} - {agendamento.dataHora ?
                  <TextFormat type="date" value={calculateEndTime(agendamento.dataHora, agendamento.servico.duracao)} format={APP_HOUR_FORMAT}/> : null}</td>
                <td>{agendamento.servico ?
                  <Link to={`/servico/${agendamento.servico.id}`}>{agendamento.servico.nome}</Link> : ''}</td>
                <td>{isAdmin || agendamento.user.login === currentUser.login ? agendamento.user.firstName + ' ' + agendamento.user.lastName : 'Nome ocultado'}</td>
                <td className="text-end">
                  {isAdmin && (
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/agendamento/${agendamento.id}`} color="info" size="sm"
                              data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye"/> <span className="d-none d-md-inline">Visualizar</span>
                      </Button>
                      <Button tag={Link} to={`/agendamento/${agendamento.id}/edit`} color="primary" size="sm"
                              data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt"/> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button tag={Link} to={`/agendamento/${agendamento.id}/delete`} color="danger" size="sm"
                              data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash"/> <span className="d-none d-md-inline">Apagar</span>
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">Nenhum agendamento encontrado</div>
        )}
      </div>
    </div>
  );
};

export default Agendamento;
