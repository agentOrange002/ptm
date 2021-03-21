import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import UserRegistrationForm from './UserRegistrationForm';

const urlparam = `${window.location.origin}/#/app/`;

class UserRegistration extends Component {
    state = {	
		breadcrumdItems: [{ label: 'Administration' }, { label: 'User Register', url: `${urlparam}userregister` }],
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
					<UserRegistrationForm title={"User Registration"} />
				</div>
			</>
		);
	}
}

 
export default UserRegistration;