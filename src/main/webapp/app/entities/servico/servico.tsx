import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getEntities} from './servico.reducer';

export const Servico = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const servicoList = useAppSelector(state => state.servico.entities);
  const loading = useAppSelector(state => state.servico.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const {match} = props;

  return (
    <div>
      <h2 id="servico-heading" data-cy="ServicoHeading">
        Servicos
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/> Atualizar Lista
          </Button>
          <Link to="/servico/new" className="btn btn-primary jh-create-entity" id="jh-create-entity"
                data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus"/>
            &nbsp; Criar novo Serviço
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {servicoList && servicoList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Duração</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {servicoList.map((servico, i) => (
              <tr key={`entity-${i}`} data-cy="entityTable">
                <td>
                  <Button tag={Link} to={`/servico/${servico.id}`} color="link" size="sm">
                    {servico.id}
                  </Button>
                </td>
                <td>{servico.nome}</td>
                <td>{servico.descricao}</td>
                <td>{servico.categoria}</td>
                <td>R$ {servico.preco},00</td>
                <td>{servico.duracao} min</td>
                <td className="text-end">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`/servico/${servico.id}`} color="info" size="sm"
                            data-cy="entityDetailsButton">
                      <FontAwesomeIcon icon="eye"/> <span className="d-none d-md-inline">Visualizar</span>
                    </Button>
                    <Button tag={Link} to={`/servico/${servico.id}/edit`} color="primary" size="sm"
                            data-cy="entityEditButton">
                      <FontAwesomeIcon icon="pencil-alt"/> <span className="d-none d-md-inline">Editar</span>
                    </Button>
                    <Button tag={Link} to={`/servico/${servico.id}/delete`} color="danger" size="sm"
                            data-cy="entityDeleteButton">
                      <FontAwesomeIcon icon="trash"/> <span className="d-none d-md-inline">Apagar</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Servicos found</div>
        )}
      </div>
    </div>
  );
};

export default Servico;
