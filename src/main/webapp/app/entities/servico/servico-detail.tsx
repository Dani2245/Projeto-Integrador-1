import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './servico.reducer';

export const ServicoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const servicoEntity = useAppSelector(state => state.servico.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="servicoDetailsHeading">Servico</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{servicoEntity.id}</dd>
          <dt>
            <span id="nome">Nome</span>
          </dt>
          <dd>{servicoEntity.nome}</dd>
          <dt>
            <span id="descricao">Descricao</span>
          </dt>
          <dd>{servicoEntity.descricao}</dd>
          <dt>
            <span id="categoria">Categoria</span>
          </dt>
          <dd>{servicoEntity.categoria}</dd>
          <dt>
            <span id="preco">Preco</span>
          </dt>
          <dd>{servicoEntity.preco}</dd>
          <dt>
            <span id="duracao">Duracao</span>
          </dt>
          <dd>{servicoEntity.duracao}</dd>
        </dl>
        <Button tag={Link} to="/servico" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/servico/${servicoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ServicoDetail;
