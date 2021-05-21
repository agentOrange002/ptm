import React, { Component } from 'react';
import AppSubmenu from './AppSubmenu';
import { connect } from 'react-redux';
import _ from 'lodash';

class AppMenu extends Component {
	state = {
		menu: [],
	};

	componentDidMount() {
		this.createMenu();
	}

	createMenu() {
		if (_.includes(this.props.AUTHORITIES, 'DASHBOARD')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/app/' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'MEMBER_REGISTER')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Member Register', icon: 'pi pi-fw pi-user-plus', to: '/app/memberregister' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'BOARD_REGISTER')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Board Register', icon: 'pi pi-fw pi-users', to: '/app/boardregister' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'CATEGORY_REGISTER')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Category Register', icon: 'pi pi-fw pi-users', to: '/app/categoryregister' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'MEMBER_MAINTENANCE')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Member Maintenance', icon: 'pi pi-fw pi-cog', to: '/app/membermaintenance' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'BOARD_MAINTENANCE')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Board Maintenance', icon: 'pi pi-fw pi-cog', to: '/app/boardmaintenance' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'CATEGORY_MAINTENANCE')) {
			this.setState((state) => ({
				menu: state.menu.concat([{ label: 'Category Maintenance', icon: 'pi pi-fw pi-cog', to: '/app/categorymaintenance' }]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'PROCESSES')) {
			this.setState((state) => ({
				menu: state.menu.concat([
					{
						label: 'Process',
						icon: 'pi pi-fw pi-file',
						items: [
							{ label: 'Recruitment Process', icon: 'pi pi-fw pi-file', to: '/app/process/recruitment' },
							{ label: 'Release Process', icon: 'pi pi-fw pi-file', to: '/app/process/release' },
							{ label: 'Claim Process', icon: 'pi pi-fw pi-file', to: '/app/process/claim' },
						],
					},
				]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'REPORTS')) {
			this.setState((state) => ({
				menu: state.menu.concat([
					{
						label: 'Reports',
						icon: 'pi pi-fw pi-file',
						items: [
							{ label: 'Member Info Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/report/memberinfo' },
							{ label: 'Board Info Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/report/boardinfo' },
						],
					},
				]),
			}));
		}
		if (_.includes(this.props.AUTHORITIES, 'ADMINISTRATION')) {
			this.setState((state) => ({
				menu: state.menu.concat([
					{
						label: 'Administration',
						icon: 'pi pi-fw pi-id-card',
						items: [
							{ label: 'User Registration', icon: 'pi pi-fw pi-user', to: '/app/userregister' },
							{ label: 'System Administration', icon: 'pi pi-fw pi-file', to: '/app/administration' },
						],
					},
				]),
			}));
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.AUTHORITIES !== prevProps.AUTHORITIES) {
			if (_.isEmpty(this.state.menu)) {
				this.createMenu();
			}
		}
	}

	render() {
		return (
			<div className='layout-menu-container'>
				<AppSubmenu items={this.state.menu} className='layout-menu' onMenuItemClick={this.props.onMenuItemClick} root={true} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		AUTHORITIES: _.map(Object.values(state.AUTHORITIES.userAuthorities), 'name'),
		FETCHTYPE: state.AUTHORITIES.fetchType,
	};
};

export default connect(mapStateToProps, null)(AppMenu);
