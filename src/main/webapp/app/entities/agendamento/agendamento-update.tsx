import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IServico } from 'app/shared/model/servico.model';
import { getEntities as getServicos } from 'app/entities/servico/servico.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IAgendamento } from 'app/shared/model/agendamento.model';
import { getEntity, updateEntity, createEntity, reset } from './agendamento.reducer';

export const AgendamentoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const servicos = useAppSelector(state => state.servico.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const agendamentoEntity = useAppSelector(state => state.agendamento.entity);
  const loading = useAppSelector(state => state.agendamento.loading);
  const updating = useAppSelector(state => state.agendamento.updating);
  const updateSuccess = useAppSelector(state => state.agendamento.updateSuccess);
  const handleClose = () => {
    props.history.push('/agendamento');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getServicos({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dataHora = convertDateTimeToServer(values.dataHora);

    const entity = {
      ...agendamentoEntity,
      ...values,
      servico: servicos.find(it => it.id.toString() === values.servico.toString()),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dataHora: displayDefaultDateTime(),
        }
      : {
          ...agendamentoEntity,
          dataHora: convertDateTimeFromServer(agendamentoEntity.dataHora),
          servico: agendamentoEntity?.servico?.id,
          user: agendamentoEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projetoIntegradorUmApp.agendamento.home.createOrEditLabel" data-cy="AgendamentoCreateUpdateHeading">
            Create or edit a Agendamento
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="agendamento-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Data Hora"
                id="agendamento-dataHora"
                name="dataHora"
                data-cy="dataHora"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="agendamento-servico" name="servico" data-cy="servico" label="Servico" type="select">
                <option value="" key="0" />
                {servicos
                  ? servicos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nome}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="agendamento-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.getfName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/agendamento" replace color="info">
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

export default AgendamentoUpdate;
