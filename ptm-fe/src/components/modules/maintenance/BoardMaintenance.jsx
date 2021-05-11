import React, { Component } from 'react';
import CustomBreadCrumb from '../../breadcrumb';
import { Menubar } from 'primereact/menubar';
import { Switch, Route, Redirect } from 'react-router-dom';
import history from '../../../routes/history';
import BoardData from './BoardData';
import BoardInfo from './BoardInfo';
import BoardRegistrationForm from '../registration/BoardRegistrationForm';
import NotFoundPage from '../error/NotFoundPage';
import BoardMemberVisual from './BoardMemberVisual';

const urlparam = `${window.location.origin}/#/app/`;

const MyStyle = {
	paddingT: {
		paddingTop: '.5em',
	},
	menubar: { height: '50px' },
};

class BoardMaintenance extends Component {
	state = {
		breadcrumdItems: [{ label: 'Maintenance' }, { label: 'Board Maintenance', url: `${urlparam}boardmaintenance` }],
		home: {
			icon: 'pi pi-home',
			command: () => {
				history.push('/app/');
			},
		},
		menuItems: [
			{
				label: 'Boards',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Add New Board',
						icon: 'pi pi-fw pi-plus',
						url: `${urlparam}boardmaintenance/register`,
					},
					{
						separator: true,
					},
					{
						label: 'All Boards',
						icon: 'pi pi-fw pi-table',
						url: `${urlparam}boardmaintenance`,
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
									<Route path='/app/boardmaintenance/' exact component={BoardData} />

									<Route path='/app/boardmaintenance/register' render={(props) => <BoardRegistrationForm {...props} title={'Add Board'} />} />

									<Route path='/app/boardmaintenance/visual' component={BoardMemberVisual} />
									<Route path='/app/boardmaintenance/view/:boardId' component={BoardInfo} />
									<Route path='/app/boardmaintenance/notfound' component={NotFoundPage} />
									<Redirect from='/app/boardmaintenance/*' to='/app/boardmaintenance/notfound' />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default BoardMaintenance;
