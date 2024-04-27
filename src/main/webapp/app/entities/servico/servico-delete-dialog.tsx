import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {deleteEntity, getEntity} from './servico.reducer';

export const ServicoDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const servicoEntity = useAppSelector(state => state.servico.entity);
  const updateSuccess = useAppSelector(state => state.servico.updateSuccess);

  const handleClose = () => {
    props.history.push('/servico');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(servicoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="servicoDeleteDialogHeading">
        Confirmar a operação de exclusão
      </ModalHeader>
      <ModalBody id="projetoIntegradorUmApp.servico.delete.question">Tem certeza que deseja excluir esse
        Serviço?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban"/>
          &nbsp; Cancelar
        </Button>
        <Button id="jhi-confirm-delete-servico" data-cy="entityConfirmDeleteButton" color="danger"
                onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash"/>
          &nbsp; Apagar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ServicoDeleteDialog;
