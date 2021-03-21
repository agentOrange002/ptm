import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
//import { Button } from 'primereact/button';
//import { Menu } from 'primereact/menu';
import PropTypes from 'prop-types';

//import HeaderProgressBar from './components/modules/tools/HeaderProgressBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LogOut } from './components/commands/Logout';

import history from './routes/history';

const MyStyle = {
    paddingTop: {       
        position:"fixed",
        top: '0px',
        left:"0px",
        right:"0",
        height:"6px",       
        },
    width:{ width: '200px' },
    bc: { backgroundColor: '#191919' },
    Button: { marginLeft: 4, backgroundColor: '#191919' },
    searchWidth:{width:'250px'}
}

class AppTopbar extends Component {

    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: '',
                    icon: 'pi pi-fw pi-cog',
                    items: [
                        {
                            label: 'User Profile',
                            icon: 'pi pi-fw pi-user',
                            command: () => { history.push('/app/accountprofile'); }
                        },
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            command: () => { history.push('/app/'); }
                        },
                        {
                            separator: true
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-power-off',
                            command: ()=>{LogOut();}
                        }
                    ]
                }
            ]
        };
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    logout = (event) => {
        event.preventDefault();
        LogOut();       
    }

    render() {
        return (
            <>        
            <div className="layout-topbar clearfix">      
                <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />

                <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars" />
                </button>
                <div className="layout-topbar-icons" >                
                     <span className="layout-topbar-search">
                       <InputText type="text" placeholder="Search " style={MyStyle.searchWidth}/>
                        <span className="layout-topbar-search-icon pi pi-search"/>   
                    </span>  
                    <button className="p-link" >
                        <span className="layout-topbar-item-text">Events</span>
                        <span className="layout-topbar-icon pi pi-calendar"/ >
                        {/* <span className="layout-topbar-badge">5</span> */}
                    </button>                       
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>   
                    <button className="p-link" onClick={(event)=>this.menu.show(event)}>
                        <span className="layout-topbar-item-text">Settings</span>
                        <span className="layout-topbar-icon pi pi-cog"/>
                    </button>
                </div>   
                {/* <div style={MyStyle.paddingTop}>
                    <HeaderProgressBar nameofbar={"LOADINGBAR"} />
                </div>                */}
            </div>
            <Menu model={this.state.items} popup={true}  ref={el => this.menu=el}  />
            </>
        );   
    }
}

export default AppTopbar;