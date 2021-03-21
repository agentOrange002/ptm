import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

const checkComponentName = (name, authtypes, auth) => {
	let result = false;
	if (auth) {
		if (_.includes(authtypes, name)) {
			//console.log("Auth: Routes: "+authtypes);
			result = true;
		}
	}
	return result;
};

const AuthorizedRoute = (props) => {
	const { component: Component, AUTHORITIES, LOGIN_AUTHENTICATION, checkName, ...rest } = props;
	return <Route {...rest} render={(props) => (checkComponentName(checkName, JSON.stringify(AUTHORITIES), LOGIN_AUTHENTICATION.loginState.isAuthenticated) ? <Component {...props} /> : <Redirect to='/app/unauthorized401' />)} />;
};

const mapStateToProps = (state) => {
	return {
		LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
		AUTHORITIES: _.map(Object.values(state.AUTHORITIES.userAuthorities), 'name'),
	};
};

export default connect(mapStateToProps, null)(AuthorizedRoute);
