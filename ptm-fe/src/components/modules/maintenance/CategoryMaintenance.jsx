import React, { Component } from 'react';
import CustomBreadCrumb from '../../breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Route,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import CategoryData from './CategoryData';
import CategoryRegistrationForm from '../registration/CategoryRegistrationForm'; 
import NotFoundPage from '../error/NotFoundPage';      

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {    
    paddingT : {
        paddingTop: '.5em'
    } ,  
    menubar:{height:'50px'},  
}

class CategoryMaintenance extends Component {

    state = { 
        breadcrumdItems: [{ label: 'Maintenance' }, { label: 'Category Maintenance', url: `${urlparam}categorymaintenance` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
        },
        menuItems: [
            {
                label: 'Categories',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Add New Category',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}categorymaintenance/register`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Categories',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}categorymaintenance`
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
											<Route path='/app/categorymaintenance/' exact component={CategoryData} />                                            
                                            <Route path='/app/categorymaintenance/register'                                             
                                            render={(props) => (
                                                <CategoryRegistrationForm {...props} title={"Add Category"}  />
                                              )}
                                            />                                                    
                                           
                                            <Route path="/app/categorymaintenance/notfound" component={NotFoundPage} />   
                                            <Redirect from="/app/categorymaintenance/*" to="/app/categorymaintenance/notfound" />                                            
										</Switch>
									</div>
								</div>
							</div>
						</div>
					</>
				);
    }
}
 
export default CategoryMaintenance;