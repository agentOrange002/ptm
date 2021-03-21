import React, { Component } from 'react';
import CustomBreadCrumb from '../../breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Route,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import MemberData from './MemberData';
import MemberRegistrationForm from '../registration/MemberRegistrationForm'; 
import NotFoundPage from '../error/NotFoundPage';      
import MemberInfo from './MemberInfo';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {    
    paddingT : {
        paddingTop: '.5em'
    } ,  
    menubar:{height:'50px'},  
}

class MemberMaintenance extends Component {

    state = { 
        breadcrumdItems: [{ label: 'Maintenance' }, { label: 'Member Maintenance', url: `${urlparam}membermaintenance` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
        },
        menuItems: [
            {
                label: 'Members',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Add New Member',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}membermaintenance/register`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Members',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}membermaintenance`
                    }
                ]
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
											<Route path='/app/membermaintenance/' exact component={MemberData} />
                                            <Route path='/app/membermaintenance/view/:memberId' component={MemberInfo} />
                                            <Route path='/app/membermaintenance/register'                                             
                                            render={(props) => (
                                                <MemberRegistrationForm {...props} title={"Add Member"}  />
                                              )}
                                            />                                                    
                                           
                                            <Route path="/app/membermaintenance/notfound" component={NotFoundPage} />   
                                            <Redirect from="/app/membermaintenance/*" to="/app/membermaintenance/notfound" />                                            
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