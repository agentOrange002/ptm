import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserByID } from '../../../redux/actions/UserActions';
import { getRolesByUserId } from '../../../redux/actions/RoleActions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import UILoader from '../tools/UILoader';
import { Panel } from 'primereact/panel';
import { DataScroller } from 'primereact/datascroller';
import { Dialog } from 'primereact/dialog';
import AuthorityDialog from './AuthorityDialog';

const MyStyle = {
	Panel: { paddingBottom: '1em' },
	DivButton: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '170px' },
	image: { display: 'block', marginRight: 'auto', marginLeft: 'auto', paddingBottom: '1em' },
	imageBorder: { borderStyle: 'solid', borderRadius: '150px', width: '50%', borderColor: 'black' },
	h3: { textAlign: 'center' },
	width: { width: '170px' },
	fileupload: { display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '110px', paddingBottom: '1em' },
	span: { textAlign: 'center', display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' },
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
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

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
			selectedRole: null,
			authorityDialog: false,
			menu: [
				{
					label: 'View Authorities',
					icon: 'pi pi-fw pi-search',
					command: (event) => this.viewAuthorities(this.state.selectedRole),
				},
			],
			role: null,
		};
		this.itemTemplate = this.itemTemplate.bind(this);
	}

	async componentDidMount() {
		const { userId } = this.props.match.params;
		await this.props.getRolesByUserId(userId);
	}

	viewAuthorities(role) {
		this.setState({ role: role });
		this.viewDialog();
	}

	onClickUpdateProfile = (e) => {
		e.preventDefault();
		const { memberId } = this.props.match.params;
	};

	hideDialog = () => {
		this.setState({ authorityDialog: false });
	};

	viewDialog = (data) => {
		this.setState({role:data});
		this.setState({ authorityDialog: true });
	};

	hideContext = () => {
		this.setState({ selectedRole: null });
	};

	itemTemplate = (data) => {
		return (
			<div className='item-item'>
				<div className='item-detail'>
					<div className='item-name'>{data.name}</div>
					{/* //<span className="item-price">{data.id}</span> */}
					<i className='pi pi-info-circle item-category-icon'></i>
					<span className='item-category'>{data.id}</span>
				</div>
				<div className='item-action'>
					<Button icon='pi pi-search' label='View Authorities' onClick={(event) => this.viewDialog(data)} />
				</div>
				
			</div>
		);
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12'>
					<Panel header='User Information' toggleable={true}>
						<Fieldset legend='User Profile'>
							<UILoader blockui='USER_LOADING' unblockui={['USER_UPDATE', 'USER_ERROR', 'USER_GET_BY_ID']}>
								<div className='p-fluid p-grid'>
									<div className='p-field p-col-12 p-md-6'>
										<label htmlFor='id'>ID:</label>
										<InputText id='id' type='text' value={this.props.USER.id} />
									</div>
									<div className='p-field p-col-12 p-md-6'>
										<label htmlFor='memberId'>Member ID:</label>
										<InputText id='memberId' type='text' value={this.props.USER.userId} />
									</div>
									<div className='p-field p-col-12 p-md-3'>
										<label htmlFor='firstName'>First Name:</label>
										<InputText id='firstName' type='text' defaultValue={this.props.USER.firstName} onChange={(e) => this.setState({ profile: { ...this.state.profile, firstName: e.target.value } })} />
									</div>
									<div className='p-field p-col-12 p-md-3'>
										<label htmlFor='middleName'>Middle Name:</label>
										<InputText id='middleName' type='text' defaultValue={this.props.USER.middleName} onChange={(e) => this.setState({ profile: { ...this.state.profile, middleName: e.target.value } })} />
									</div>
									<div className='p-field p-col-12 p-md-3'>
										<label htmlFor='lastName'>Last Name:</label>
										<InputText id='lastName' type='text' defaultValue={this.props.USER.lastName} onChange={(e) => this.setState({ profile: { ...this.state.profile, lastName: e.target.value } })} />
									</div>
									<div className='p-field p-col-12 p-md-3'>
										<label htmlFor='suffixName'>Suffix Name:</label>
										<InputText id='suffixName' type='text' defaultValue={this.props.USER.suffixName} onChange={(e) => this.setState({ profile: { ...this.state.profile, suffixName: e.target.value } })} />
									</div>
									<div className='p-field p-col-12 p-md-12'>
										<label htmlFor='gender'>Full Name:</label>
										<InputText id='gender' type='text' value={this.props.USER.fullName} />
									</div>
									<div className='p-field p-col-12 p-md-4'>
										<label htmlFor='dateJoined'>Email:</label>
										<InputText id='dateJoined' type='text' value={this.props.USER.email} />
									</div>
								</div>
							</UILoader>
						</Fieldset>
						<div className='button' style={MyStyle.DivButton}>
							<span>
								<Button icon='pi pi-save' label='Update Profile' style={MyStyle.Button} onClick={this.onClickUpdateProfile} />
							</span>
						</div>
					</Panel>
				</div>
				<div className='p-col-12'>
					<div className='datascroller'>
						<DataScroller value={this.props.ROLES} lazy={true} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight='500px' header='ROLES' />
					</div>
					<Dialog id='authorities' header='List of All Authorities' visible={this.state.authorityDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideDialog}>
						<AuthorityDialog hidethis={this.hideDialog} selected={this.state.role} />
					</Dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { userId } = ownProps.match.params;
	return {
		USER: state.USERS.usersResponse[userId],
		FETCHTYPE: state.USERS.fetchType,
		ERROR: state.USERS.fetchError,
		ERROR_MESSAGE: state.USERS.fetchErrorMessage,
		ROLES: Object.values(state.ROLES.rolesResponse),
	};
};

const mapDispatchToProps = { getUserByID, getRolesByUserId };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
