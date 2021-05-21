import React, { Component } from 'react';

import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import { Menubar } from 'primereact/menubar';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from '../error/NotFoundPage';
import ClaimForm from './ClaimForm';
import ClaimData from './ClaimData';
import ClaimInfo from './ClaimInfo';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {
	paddingT: {
		paddingTop: '.5em',
	},
	menubar: { height: '50px' },
};

class ClaimProcess extends Component {
	state = {
		breadcrumdItems: [{ label: 'Process' }, { label: 'Claim Process', url: `${urlparam}process/claim` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
		},
		menuItems: [
			{
				label: 'Claims',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Add New Claim',
						icon: 'pi pi-fw pi-plus',
						url: `${urlparam}process/claim/register`,
					},
					{
						separator: true,
					},
					{
						label: 'All Claims',
						icon: 'pi pi-fw pi-table',
						url: `${urlparam}process/claim`,
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
			<div>
				<>
					<CustomBreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
					<div className='layout-main-inside'>
						<div className='p-grid p-fluid'>
							<div className='p-col-12'>
								<Menubar style={MyStyle.menubar} model={this.state.menuItems} />
								<div style={{ paddingTop: '.5em' }}>
									<Switch>
										<Route path='/app/process/claim' exact component={ClaimData} />
										<Route path='/app/process/claim/register' render={(props) => <ClaimForm {...props} title={'Add New Claim Form'} />} />
										<Route path='/app/process/claim/view/:claimId' component={ClaimInfo} />
										<Route path='/app/process/claim/notfound' component={NotFoundPage} />
										<Redirect from='/app/process/claim/*' to='/app/process/claim/notfound' />
									</Switch>
								</div>
							</div>
						</div>
					</div>
				</>
			</div>
		);
	}
}

export default ClaimProcess;
