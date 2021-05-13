import React, { Component } from 'react';
import history from '../../../routes/history';
import CustomBreadCrumb from '../../breadcrumb';
import { Menubar } from 'primereact/menubar';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from '../error/NotFoundPage';
import RecruitmentForm from './RecruitmentForm';
import RecruitmentData from './RecruitmentData';
import RecruitmentInfo from './RecruitmentInfo';

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
						url: `${urlparam}process/recruitment/register`,
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
							<div style={{ paddingTop: '.5em' }}>
								<Switch>
									<Route path='/app/process/recruitment' exact component={RecruitmentData} />
									<Route path='/app/process/recruitment/register' render={(props) => <RecruitmentForm {...props} title={'Add New Recruitment Form'} />} />
									<Route path='/app/process/recruitment/view/:recruitmentId' component={RecruitmentInfo} />
									<Route path='/app/process/recruitment/notfound' component={NotFoundPage} />
									<Redirect from='/app/process/recruitment/*' to='/app/process/recruitment/notfound' />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default RecruitmentProcess;
