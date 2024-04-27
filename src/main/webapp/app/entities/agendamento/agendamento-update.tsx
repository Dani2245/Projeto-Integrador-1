import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {ValidatedField, ValidatedForm} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {displayDefaultDateTime} from 'app/shared/util/date-utils';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getEntities as getServicos} from 'app/entities/servico/servico.reducer';
import {getUsers} from 'app/modules/administration/user-management/user-management.reducer';
import {createEntity, getEntity, reset, updateEntity} from './agendamento.reducer';
import axios from "axios";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";

export const AgendamentoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const servicos = useAppSelector(state => state.servico.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const agendamentoEntity = useAppSelector(state => state.agendamento.entity);
  const loading = useAppSelector(state => state.agendamento.loading);
  const updating = useAppSelector(state => state.agendamento.updating);
  const updateSuccess = useAppSelector(state => state.agendamento.updateSuccess);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const currentUser = useAppSelector(state => state.authentication.account);
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

  const fetchAppointments = async () => {
    const response = await axios.get("http://localhost:8080/api/agendamentos");
    return response.data;
  };

  const validateTime = (time) => {
    const date = new Date(time);
    const day = date.getDay();
    const hour = date.getHours();

    // Check if the day is between Tuesday (2) and Saturday (6)
    if (day >= 2 && day <= 6) {
      // Check if the time is between 9 AM and 6 PM
      if (hour >= 9 && hour <= 18) {
        return true;
      } else {
        return "O agendamento precisa ser feito entre 9 AM e 6 PM.";
      }
    } else {
      return "O agendamento precisa ser feito de terça-feira a sábado.";
    }
  };
  const validateFutureDate = (dateTime) => {
    const now = new Date();
    const selectedDateTime = new Date(dateTime);
    if (selectedDateTime > now) {
      return true;
    } else {
      return "O agendamento precisa ser feito em uma data futura.";
    }
  };

  const validateOverlap = async (dateTime, duration) => {
    const selectedDateTime = new Date(dateTime);
    const durationInMilliseconds = parseInt(duration, 10) * 60000; // Convert duration to number
    const selectedEndDateTime = new Date(selectedDateTime.getTime() + durationInMilliseconds);
    const appointments = await fetchAppointments();

    // Sort appointments by start time
    appointments.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());

    for (let i = 0; i < appointments.length; i++) {
      const appointmentDateTime = new Date(appointments[i].dataHora);
      const appointmentEndDateTime = new Date(appointmentDateTime.getTime() + appointments[i].servico.duracao * 60000);

      // Check if the new appointment overlaps with the current appointment
      if ((selectedDateTime >= appointmentDateTime && selectedDateTime < appointmentEndDateTime) ||
        (selectedEndDateTime > appointmentDateTime && selectedEndDateTime <= appointmentEndDateTime)) {
        return "Já existe um agendamento marcado para esse horário.";
      }

      // Check if the new appointment is in between two appointments
      // if (i < appointments.length - 1) {
      //   const nextAppointmentDateTime = new Date(appointments[i + 1].dataHora);
      //   const nextAppointmentEndDateTime = new Date(nextAppointmentDateTime.getTime() + appointments[i + 1].servico.duracao * 60000);
      //   if (selectedDateTime >= appointmentEndDateTime && selectedEndDateTime <= nextAppointmentDateTime) {
      //     return "O serviço selecionado não pode ser concluído entre dois agendamentos já existentes.";
      //   }
      // }
    }

    return true;
  };

  const getServiceById = (id) => {
    return servicos.find(it => it.id.toString() === id.toString());
  };

  const saveEntity = async values => {
    const service = getServiceById(values.servico);
    const timeValidationResult = validateTime(values.dataHora);
    if (timeValidationResult !== true) {
      alert(timeValidationResult);
      return;
    }

    const dateValidationResult = validateFutureDate(values.dataHora);
    if (dateValidationResult !== true) {
      alert(dateValidationResult);
      return;
    }

    const overlapValidationResult = await validateOverlap(values.dataHora, service.duracao);
    if (overlapValidationResult !== true) {
      alert(overlapValidationResult);
      return;
    }

    const entity = {
      ...agendamentoEntity,
      ...values,
      servico: service,
      user: users.find(it => it.login === currentUser.login), // Set the Cliente to the current logged in user
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
        dataHora: agendamentoEntity.dataHora,
        servico: agendamentoEntity?.servico?.id,
        user: agendamentoEntity?.user?.id,
      };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projetoIntegradorUmApp.agendamento.home.createOrEditLabel" data-cy="AgendamentoCreateUpdateHeading">
            Criar ou editar Agendamento
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="agendamento-id" label="ID"
                                        validate={{required: true}}/> : null}
              <ValidatedField
                label="Data e Hora"
                id="agendamento-dataHora"
                name="dataHora"
                data-cy="dataHora"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="agendamento-servico" name="servico" data-cy="servico" label="Serviço" type="select">
                <option value="" key="0"/>
                {servicos
                  ? servicos.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.nome}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              {isAdmin && (
                <ValidatedField id="agendamento-user" name="user" data-cy="user" label="Cliente" type="select">
                  <option value="" key="0"/>
                  {users
                    ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.getfName ? otherEntity.getfName + " " + otherEntity.getlName : otherEntity.login}
                      </option>
                    ))
                    : null}
                </ValidatedField>
              )}
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/agendamento" replace
                      color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">Voltar</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit"
                      disabled={updating}>
                <FontAwesomeIcon icon="save"/>
                &nbsp; Salvar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AgendamentoUpdate;
