import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAgendamento } from 'app/shared/model/agendamento.model';
import { getEntities as getAgendamentos } from 'app/entities/agendamento/agendamento.reducer';
import { IServico } from 'app/shared/model/servico.model';
import { getEntity, updateEntity, createEntity, reset } from './servico.reducer';

export const ServicoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const agendamentos = useAppSelector(state => state.agendamento.entities);
  const servicoEntity = useAppSelector(state => state.servico.entity);
  const loading = useAppSelector(state => state.servico.loading);
  const updating = useAppSelector(state => state.servico.updating);
  const updateSuccess = useAppSelector(state => state.servico.updateSuccess);
  const handleClose = () => {
    props.history.push('/servico');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAgendamentos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...servicoEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...servicoEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projetoIntegradorUmApp.servico.home.createOrEditLabel" data-cy="ServicoCreateUpdateHeading">
            Create or edit a Servico
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="servico-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Nome"
                id="servico-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Descricao" id="servico-descricao" name="descricao" data-cy="descricao" type="text" />
              <ValidatedField label="Categoria" id="servico-categoria" name="categoria" data-cy="categoria" type="text" />
              <ValidatedField label="Preco" id="servico-preco" name="preco" data-cy="preco" type="text" />
              <ValidatedField label="Duracao" id="servico-duracao" name="duracao" data-cy="duracao" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/servico" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ServicoUpdate;
