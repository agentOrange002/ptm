import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import { Menubar } from 'primereact/menubar';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {
	paddingT: {
		paddingTop: '.5em',
	},
	menubar: { height: '50px' },
};

class RecruitmentProcess extends Component {
	state = {
		breadcrumdItems: [{ label: 'Process' }, { label: 'Recruitment Process', url: `${urlparam}process/recruitment` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
		},
		menuItems: [
			{
				label: 'Recruitments',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Add New Recruitment',
						icon: 'pi pi-fw pi-plus',
						url: `${urlparam}process/recruitmentregister`,
					},
					{
						separator: true,
					},
					{
						label: 'All Recruitments',
						icon: 'pi pi-fw pi-table',
						url: `${urlparam}process/recruitment`,
					},
				],
			},
			{
				label: 'Print',
				icon: 'pi pi-fw pi-print',
			},
		],
	};
	render() {
		return (
			<>
				<CustomBreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
				<div className='layout-main-inside'>
					<div className='p-grid p-fluid'>
						<div className='p-col-12'>
							<Menubar style={MyStyle.menubar} model={this.state.menuItems} />
							<div style={{ paddingTop: '.5em' }}></div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default RecruitmentProcess;
