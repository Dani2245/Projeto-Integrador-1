import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Agendamento from './agendamento';
import AgendamentoDetail from './agendamento-detail';
import AgendamentoUpdate from './agendamento-update';
import AgendamentoDeleteDialog from './agendamento-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AgendamentoUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AgendamentoUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AgendamentoDetail}/>
      <ErrorBoundaryRoute path={match.url} component={Agendamento}/>
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AgendamentoDeleteDialog}/>
  </>
);

export default Routes;
