import React, { Component } from 'react';
import CustomBreadCrumb from '../../breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Route,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import UserData from './UserData';
import UserRegistrationForm from './UserRegistrationForm'; 
import NotFoundPage from '../error/NotFoundPage';      
import RoleData from './RoleData';
import UserInfo from './UserInfo';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {    
    paddingT : {
        paddingTop: '.5em'
    } ,  
    menubar:{height:'50px'},  
}

class MemberMaintenance extends Component {

    state = { 
        breadcrumdItems: [{ label: 'Administration' }, { label: 'System Administration', url: `${urlparam}administration` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
        },
        menuItems: [
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Add New User',
                        icon: 'pi pi-fw pi-user-plus',
                        url: `${urlparam}administration/adduser`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Users',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}administration`
                    }
                ]
            },      
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-users',
                url: `${urlparam}administration/roles`                
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
            }
        ]
     }  
    
    render() { 
        return (
					<>
						<CustomBreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
						<div className='layout-main-inside'>
							<div className='p-grid p-fluid'>
								<div className='p-col-12'>
									<Menubar style={MyStyle.menubar} model={this.state.menuItems} />
									<div style={{ paddingTop: '.5em' }}>
										<Switch>
											<Route path='/app/administration/' exact component={UserData} />
                                            <Route path='/app/administration/user/:userId' component={UserInfo} />
                                           
                                            <Route path='/app/administration/adduser'                                             
                                            render={(props) => (
                                                <UserRegistrationForm {...props} title={"Add New User"}  />
                                              )}
                                            />      

                                            <Route path='/app/administration/roles'                                             
                                            render={(props) => (
                                                <RoleData {...props} title={"Role Data"}  />
                                              )}
                                            />                                                  
                                           
                                            <Route path="/app/administration/notfound" component={NotFoundPage} />   
                                            <Redirect from="/app/administration/*" to="/app/administration/notfound" />                                            
										</Switch>
									</div>
								</div>
							</div>
						</div>
					</>
				);
    }
}
 
export default MemberMaintenance;