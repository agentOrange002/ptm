import React, { Component } from 'react';
import history from '../../../routes/history';
import MemberRegistrationForm from './MemberRegistrationForm';
import CustomBreadCrumb from '../../breadcrumb';

const MyStyle = {
	breadcrumbBG: {
		borderStyle: 'solid',
		backgroundColor: '#edf0f5',
		color: '#edf0f5',
	},
	breadcrumb: {
		background: '#edf0f5',
		borderColor: '#edf0f5',
	},
};

const urlparam = `${window.location.origin}/#/app/`;



class MemberRegistration extends Component {
	state = {
		
		breadcrumdItems: [{ label: 'Registration' }, { label: 'Member Register', url: `${urlparam}memberregister` }],
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
					<MemberRegistrationForm title={"Member Registration"} />
				</div>
			</>
		);
	}
}

export default MemberRegistration;
