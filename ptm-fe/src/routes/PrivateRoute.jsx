import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
// import _ from 'lodash';

// const checkComponentName = (name,atype) => {
//   switch(name) {
//     case 'UserMaintenance':
//     if(_.includes(atype,'UserMaintenance')){
//       return true;
//     }
//     else { return}

//     default:
//       return true;
//   }
// }

// authenticated
    //   ? <Component {...props} />
    //   : <Redirect to='/login' />

//  const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (   
//   <Route {...rest} render={(props) => (  
//     authenticated ? <Component {...props} /> : <Redirect to='/login' />  
//   )} /> 
// )

const PrivateRoute = props => {
  const { component: Component, LOGIN_AUTHENTICATION, ...rest } = props ;
  return <Route
   {...rest}
    render={(props) => (  
      LOGIN_AUTHENTICATION.loginState.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />  
    )
  }/> 
}    

// const PrivateRoute = connect(state => ({
//   LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION  
// }))(_PrivateRoute);
const mapStateToProps = state => {
  return {
      LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION
  };
};


export default connect(mapStateToProps,null)(PrivateRoute);