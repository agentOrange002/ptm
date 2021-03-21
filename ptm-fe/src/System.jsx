import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'; 
import App from './App';
import PrivateRoute from './routes/PrivateRoute';
//import SignupPage from './components/modules/public/SignupPage';
import LoginPage from './components/modules/public/LoginPage';
//import PasswordResetPage from './components/modules/public/PasswordResetPage';

class System extends Component {  

    render() { 
        return (             
            <Switch>              
              <PrivateRoute path="/app/" component={App} />     
              <Route path="/login" component={LoginPage} />             
              {/* <Route path="/signup" component={SignupPage} />    */}
             {/* <Route path="/passwordreset/:id/:token" component={PasswordResetPage} />   */}
              <Redirect from="/" to="/login" />
            </Switch>     
         );
    }
}

const mapStateToProps = (state) => {
    return {     
      authentication: state.LOGIN_AUTHENTICATION.loginState.isAuthenticated
    };
}
  
export default connect(mapStateToProps,null)(System);