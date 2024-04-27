import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {useAppSelector} from 'app/config/store';
import ErrorBoundary from 'app/shared/error/error-boundary';

interface IOwnProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export const PrivateRouteComponent = ({component: Component, hasAnyAuthorities = [], ...rest}: IOwnProps) => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const sessionHasBeenFetched = useAppSelector(state => state.authentication.sessionHasBeenFetched);
  const account = useAppSelector(state => state.authentication.account);
  const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

  const checkAuthorities = props =>
    isAuthorized ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <div className="insufficient-authority">
        <div className="alert alert-danger">Você não está autorizado a acessar esta página.</div>
      </div>
    );

  const renderRedirect = props => {
    if (!sessionHasBeenFetched) {
      return <div></div>;
    } else {
      return isAuthenticated ? (
        checkAuthorities(props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            search: props.location.search,
            state: {from: props.location},
          }}
        />
      );
    }
  };

  if (!Component) throw new Error(`Um componente precisa ser especificado para a rota privada para o caminho ${(rest as any).path}`);

  return <Route {...rest} render={renderRedirect}/>;
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

/**
 * Uma rota envolta em uma verificação de autenticação para que o roteamento ocorra apenas quando você estiver autenticado.
 * Aceita as mesmas props que a rota do React router.
 * A rota também verifica a autorização se hasAnyAuthorities for especificado.
 */
export default PrivateRouteComponent;
