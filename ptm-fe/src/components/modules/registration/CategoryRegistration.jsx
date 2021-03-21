import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import CategoryRegistrationForm from './CategoryRegistrationForm';

const urlparam = `${window.location.origin}/#/app/`;

class CategoryRegistration extends Component {
  
	state = {	
		breadcrumdItems: [{ label: 'Registration' }, { label: 'Category Register', url: `${urlparam}categoryregister` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
		},
	};	

	render() {
		return (
			<>				
                <CustomBreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
				<div className='layout-main-inside'>
					<CategoryRegistrationForm title={"Category Registration"} />
				</div>
			</>
		);
	}
}
 
export default CategoryRegistration;