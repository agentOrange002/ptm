import React, { Component } from 'react';
import classNames from 'classnames';

import {connect} from 'react-redux';
// import {LoginProfile} from './redux/actions/LoginActions';
// import {systemAuthoritiesUser} from './redux/actions/AuthorityActions';
import _ from 'lodash';

import history from "./routes/history";

import {LogOut} from './components/commands/Logout';

const MyStyle={
    fonts: {fontSize:'13px'}
}

class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,           
        };
        this.onClick = this.onClick.bind(this);
    }
   
    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    clickAccount = (event) => {
        event.preventDefault();
        history.push("/app/accountprofile"); 
    }

    clickNotification = (event) => {
        event.preventDefault();
    }

    clickLogout = (event) => {
        event.preventDefault();
        LogOut();
    }

    componentDidMount() {              
    //   if(_.isEmpty(this.props.LOGIN_PROFILE.profileState.profileResponse)) {
    //     this.props.LoginProfile();
    //   }
    //   if(_.isEmpty(this.props.USER_AUTHORITIES)){
    //     this.props.systemAuthoritiesUser();
    //   }
    }

    render() {     
        let profilepicture = null;
        if(!_.isEmpty(this.props.LOGIN_PROFILE.profileState.profileResponse)) {
            if(_.isEmpty(this.props.LOGIN_PROFILE.profileState.profileResponse.userImage)){
                profilepicture = null;
            }   
            else{
                profilepicture=this.props.LOGIN_PROFILE.profileState.profileResponse.userImage.image;
            }              
        } 

        return  (
            <div className="layout-profile">             
                <div>
                    <img src={_.isEmpty(profilepicture) ? "assets/assets/layout/images/profile.png" :`data:image/png;charset=utf-8;base64,${profilepicture}` } alt="LoginProfile" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                <span className="username">{this.props.LOGIN_PROFILE.profileState.profileResponse.firstName} {this.props.LOGIN_PROFILE.profileState.profileResponse.lastName}</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button style={MyStyle.fonts} className="p-link" onClick={this.clickAccount}><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li>
                        <button style={MyStyle.fonts} className="p-link" onClick={this.clickNotification}>
                            <i className="pi pi-fw pi-inbox"/>
                            <span>Notifications</span>
                            {/* <span className="menuitem-badge">2</span> */}
                        </button>
                    </li>
                    <li><button style={MyStyle.fonts} className="p-link" onClick={this.clickLogout}><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		LOGIN_PROFILE: state.LOGIN_PROFILE,
        USER_AUTHORITIES: state.AUTHORITIES.userAuthorities,
	};
};

// const mapDispatchToProps = { LoginProfile, systemAuthoritiesUser };

export default connect(mapStateToProps,null)(AppProfile);