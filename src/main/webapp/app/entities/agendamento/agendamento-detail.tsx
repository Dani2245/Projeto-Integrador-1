import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {TextFormat} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {useAppDispatch, useAppSelector} from 'app/config/store';

import {getEntity} from './agendamento.reducer';

export const AgendamentoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const agendamentoEntity = useAppSelector(state => state.agendamento.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agendamentoDetailsHeading">Agendamento</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{agendamentoEntity.id}</dd>
          <dt>
            <span id="dataHora">Data Hora</span>
          </dt>
          <dd>
            {agendamentoEntity.dataHora ?
              <TextFormat value={agendamentoEntity.dataHora} type="date" format={APP_DATE_FORMAT}/> : null}
          </dd>
          <dt>Serviço</dt>
          <dd>{agendamentoEntity.servico ? agendamentoEntity.servico.nome : ''}</dd>
          <dt>Categoria</dt>
          <dd>{agendamentoEntity.servico ? agendamentoEntity.servico.categoria : ''}</dd>
          <dt>Valor</dt>
          <dd>{agendamentoEntity.servico ? 'R$ ' + agendamentoEntity.servico.preco + ',00' : ''}</dd>
          <dt>Duração</dt>
          <dd>{agendamentoEntity.servico ? agendamentoEntity.servico.duracao + ' minutos' : ''}</dd>
          <dt>Cliente</dt>
          <dd>{agendamentoEntity.user ? agendamentoEntity.user.firstName + ' ' + agendamentoEntity.user.lastName : ''}</dd>
        </dl>
        <Button tag={Link} to="/agendamento" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left"/> <span className="d-none d-md-inline">Voltar</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/agendamento/${agendamentoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AgendamentoDetail;
