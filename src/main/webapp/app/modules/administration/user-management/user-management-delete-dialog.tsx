import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {deleteUser, getUser} from './user-management.reducer';
import {useAppDispatch, useAppSelector} from 'app/config/store';

export const UserManagementDeleteDialog = (props: RouteComponentProps<{ login: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(props.match.params.login));
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/user-management');
  };

  const user = useAppSelector(state => state.userManagement.user);

  const confirmDelete = event => {
    dispatch(deleteUser(user.login));
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirmar operação de exclusão</ModalHeader>
      <ModalBody>Tem certeza de que deseja excluir este usuário?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban"/>
          &nbsp; Cancelar
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash"/>
          &nbsp; Excluir
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserManagementDeleteDialog;
