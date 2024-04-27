import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {deleteEntity, getEntity} from './agendamento.reducer';

export const AgendamentoDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const agendamentoEntity = useAppSelector(state => state.agendamento.entity);
  const updateSuccess = useAppSelector(state => state.agendamento.updateSuccess);

  const handleClose = () => {
    props.history.push('/agendamento');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(agendamentoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="agendamentoDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="projetoIntegradorUmApp.agendamento.delete.question">Tem certeza que quer apagar esse
        Agendamento?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban"/>
          &nbsp; Cancelar
        </Button>
        <Button id="jhi-confirm-delete-agendamento" data-cy="entityConfirmDeleteButton" color="danger"
                onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash"/>
          &nbsp; Apagar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AgendamentoDeleteDialog;
