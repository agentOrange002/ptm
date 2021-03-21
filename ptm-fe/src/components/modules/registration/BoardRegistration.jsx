import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import BoardRegistrationForm from './BoardRegistrationForm';

const urlparam = `${window.location.origin}/#/app/`;

class BoardRegistration extends Component {

	state = {	
		breadcrumdItems: [{ label: 'Registration' }, { label: 'Board Register', url: `${urlparam}boardregister` }],
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
					<BoardRegistrationForm title={"Board Registration"} />
				</div>
			</>
		);
	}
}

export default BoardRegistration;
