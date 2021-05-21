import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import { Menubar } from 'primereact/menubar';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from '../error/NotFoundPage';
import ReleaseForm from './ReleaseForm';
import ReleaseData from './ReleaseData';
import ReleaseInfo from './ReleaseInfo';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {
	paddingT: {
		paddingTop: '.5em',
	},
	menubar: { height: '50px' },
};

class ReleaseProcess extends Component {
	state = {
		breadcrumdItems: [{ label: 'Process' }, { label: 'Release Process', url: `${urlparam}process/release` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
		},
		menuItems: [
			{
				label: 'Releases',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Add New Release',
						icon: 'pi pi-fw pi-plus',
						url: `${urlparam}process/release/register`,
					},
					{
						separator: true,
					},
					{
						label: 'All Releases',
						icon: 'pi pi-fw pi-table',
						url: `${urlparam}process/release`,
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
							<div style={{ paddingTop: '.5em' }}>
								<Switch>
									<Route path='/app/process/release' exact component={ReleaseData} />
									<Route path='/app/process/release/register' render={(props) => <ReleaseForm {...props} title={'Add New Release Form'} />} />
									<Route path='/app/process/release/view/:releaseId' component={ReleaseInfo} />
									<Route path='/app/process/release/notfound' component={NotFoundPage} />
									<Redirect from='/app/process/release/*' to='/app/process/release/notfound' />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ReleaseProcess;
