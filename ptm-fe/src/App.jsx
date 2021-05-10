import React, { Component } from 'react';
import classNames from 'classnames';
import AppTopbar from './AppTopbar';
import { AppFooter } from './AppFooter';

import AppMenu from './AppMenu';
import AppProfile from './AppProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

import AccountProfile from './components/modules/account/AccountProfile';

import SupportDashboard from './components/modules/dashboard';
import AuthorizedRoute from './routes/AuthorizedRoute';
import UnauthorizedPage from './components/modules/error/UnauthorizedPage';
import NotFoundPage from './components/modules/error/NotFoundPage';
import HeaderProgressBar from './components/modules/tools/HeaderProgressBar';

import { connect } from 'react-redux';
import _ from 'lodash';
import { LoginProfile } from './redux/actions/LoginActions';
import { systemAuthoritiesUser } from './redux/actions/AuthorityActions';

import MemberRegister from './components/modules/registration/MemberRegistration';
import BoardRegister from './components/modules/registration/BoardRegistration';

import MemberMaintenance from './components/modules/maintenance/MemberMaintenance';
import BoardMaintenance from './components/modules/maintenance/BoardMaintenance';
import CategoryMaintenance from './components/modules/maintenance/CategoryMaintenance';

import CategoryRegister from './components/modules/registration/CategoryRegistration';
import UserRegistration from './components/modules/administration/UserRegistration';

import Administration from './components/modules/administration/Administration';

import MemberInfoReport from './components/modules/report/MemberInfoReport';
import BoardInfoReport from './components/modules/report/BoardInfoReport';
import RecruitmentProcess from './components/modules/process/RecruitmentProcess';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			layoutMode: 'static',
			layoutColorMode: 'dark',
			staticMenuInactive: false,
			overlayMenuActive: false,
			mobileMenuActive: false,
			menu: [],
		};

		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onSidebarClick = this.onSidebarClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
	}

	componentDidMount() {
		if (_.isEmpty(this.props.LOGIN_PROFILE.profileState.profileResponse)) {
			this.props.LoginProfile();
		}
		if (_.isEmpty(this.props.AUTHORITIES)) {
			this.props.systemAuthoritiesUser();
		}
	}

	onWrapperClick(event) {
		if (!this.menuClick) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false,
			});
		}

		this.menuClick = false;
	}

	onToggleMenu(event) {
		this.menuClick = true;

		if (this.isDesktop()) {
			if (this.state.layoutMode === 'overlay') {
				this.setState({
					overlayMenuActive: !this.state.overlayMenuActive,
				});
			} else if (this.state.layoutMode === 'static') {
				this.setState({
					staticMenuInactive: !this.state.staticMenuInactive,
				});
			}
		} else {
			const mobileMenuActive = this.state.mobileMenuActive;
			this.setState({
				mobileMenuActive: !mobileMenuActive,
			});
		}

		event.preventDefault();
	}

	onSidebarClick(event) {
		this.menuClick = true;
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false,
			});
		}
	}

	addClass(element, className) {
		if (element.classList) element.classList.add(className);
		else element.className += ' ' + className;
	}

	removeClass(element, className) {
		if (element.classList) element.classList.remove(className);
		else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	componentDidUpdate() {
		if (this.state.mobileMenuActive) {
			this.addClass(document.body, 'body-overflow-hidden');
		} else {
			this.removeClass(document.body, 'body-overflow-hidden');
		}
	}

	render() {
		//const logo = this.state.layoutColorMode === 'dark' ? `${LogoWhite}`: `${LogoBlack}`;

		const wrapperClass = classNames('layout-wrapper', {
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
			'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
			'layout-mobile-sidebar-active': this.state.mobileMenuActive,
		});

		const sidebarClassName = classNames('layout-sidebar', {
			'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
			'layout-sidebar-light': this.state.layoutColorMode === 'light',
		});

		return (
			<>
				<div className={wrapperClass} onClick={this.onWrapperClick}>
					<AppTopbar onToggleMenu={this.onToggleMenu} />

					<div ref={(el) => (this.sidebar = el)} className={sidebarClassName} onClick={this.onSidebarClick}>
						<div className='layout-logo'>{/* <img alt="Logo" src={logo} /> */}</div>
						<AppProfile />
						{/* <AppMenu model={this.state.menu} onMenuItemClick={this.onMenuItemClick} /> */}
						<AppMenu onMenuItemClick={this.onMenuItemClick} />
					</div>

					<div className='layout-main'>
						<HeaderProgressBar nameofbar={'LOADINGBAR'} />
						<Switch>
							{/* <AuthorizedRoute path="/app/" exact component={SupportDashboard} checkName='DASHBOARD'/> */}
							<Route path='/app/' exact component={SupportDashboard} />
							{/* <Route path="/app/supportdashboard" component={SupportDashboard} /> */}

							{/* <AuthorizedRoute path="/app/issuemaintenance" component={IssueMaintenancePage} checkName='IssueMaintenance'/>
                    <AuthorizedRoute path="/app/issuedetails" component={IssueDetailsPage} checkName='IssueDetails' />
                   */}
							<AuthorizedRoute path='/app/membermaintenance' component={MemberMaintenance} checkName='MEMBER_MAINTENANCE' />
							<AuthorizedRoute path='/app/memberregister' component={MemberRegister} checkName='MEMBER_REGISTER' />

							<AuthorizedRoute path='/app/boardmaintenance' component={BoardMaintenance} checkName='BOARD_MAINTENANCE' />
							<AuthorizedRoute path='/app/boardregister' component={BoardRegister} checkName='BOARD_REGISTER' />

							<AuthorizedRoute path='/app/categoryregister' component={CategoryRegister} checkName='CATEGORY_REGISTER' />
							<AuthorizedRoute path='/app/categorymaintenance' component={CategoryMaintenance} checkName='CATEGORY_MAINTENANCE' />

							<AuthorizedRoute path='/app/userregister' component={UserRegistration} checkName='ADMINISTRATION' />
							<AuthorizedRoute path='/app/administration' component={Administration} checkName='ADMINISTRATION' />

							<AuthorizedRoute path='/app/report/memberinfo' component={MemberInfoReport} checkName='REPORT_MEMBER' />

							<AuthorizedRoute path='/app/report/boardinfo' component={BoardInfoReport} checkName='REPORT_BOARD' />

							<AuthorizedRoute path='/app/process/recruitment' component={RecruitmentProcess} checkName='RECRUITMENT_PROCESS' />

							<Route path='/app/accountprofile' component={AccountProfile} />
							<Route path='/app/unauthorized401' component={UnauthorizedPage} />
							<Route path='/app/notfound' component={NotFoundPage} />
							<Redirect from='/app/*' to='/app/notfound' />
						</Switch>
					</div>
				</div>
				<AppFooter />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		LOGIN_PROFILE: state.LOGIN_PROFILE,
		AUTHORITIES: state.AUTHORITIES.userAuthorities,
	};
};

const mapDispatchToProps = { LoginProfile, systemAuthoritiesUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
