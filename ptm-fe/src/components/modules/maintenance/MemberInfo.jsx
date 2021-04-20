import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMemberByMemberId, updateMember } from '../../../redux/actions/MemberActions';
import { getAllMemberAddressByMemberId, maReset } from '../../../redux/actions/MemberAddressActions';
import { getAllMemberContactByMemberId, mcReset } from '../../../redux/actions/MemberContactActions';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import MemberAddressDialog from './MemberAddressDialog';
import MemberContactDialog from './MemberContactDialog';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import _ from 'lodash';
import { Messages } from 'primereact/messages';
import { MEMBERADDRESS_SAVE } from '../../../redux/constants/MemberAddressConstants';
import { MEMBERCONTACT_SAVE } from '../../../redux/constants/MemberContactConstants';
import { MEMBER_UPDATE } from '../../../redux/constants/MemberConstants';
import UILoader from '../tools/UILoader';
import Axios from 'axios';

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

class MemberInfo extends Component {
	state = {
		profile: {},
		addressDialog: false,
		contactDialog: false,
		reportBlob: {},
	};

	componentDidMount() {
		const { memberId } = this.props.match.params;
		this.props.getMemberByMemberId(memberId);
		this.props.getAllMemberAddressByMemberId(memberId);
		this.props.getAllMemberContactByMemberId(memberId);
		this.getPDF(memberId);
	}

	hideAddressDialog = () => {
		this.setState({ addressDialog: false });
	};

	hideContactDialog = () => {
		this.setState({ contactDialog: false });
	};

	addAddress = (event) => {
		event.preventDefault();
		this.setState({ addressDialog: true });
	};

	addContact = (event) => {
		event.preventDefault();
		this.setState({ contactDialog: true });
	};

	// private String id;
	// private String memberId;
	// private String firstName;
	// private String middleName;
	// private String lastName;
	// private String suffixName;
	// private String fullName;
	// private String gender;
	// @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	// private Date dateJoined;
	// @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	// private Date dateOut;
	// private String remark;
	// private String memberStatus;
	// //private String loggedBy;
	// @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	// private Date loggedDate;

	renderProfile = () => {
		return (
			<UILoader blockui='MEMBER_LOADING' unblockui={['MEMBER_UPDATE', 'MEMBER_ERROR', 'MEMBER_GET_BY_ID']}>
				<div className='p-fluid p-grid'>
					<div className='p-field p-col-12 p-md-6'>
						<label htmlFor='id'>ID:</label>
						<InputText id='id' type='text' value={this.props.MEMBER.id} />
					</div>
					<div className='p-field p-col-12 p-md-6'>
						<label htmlFor='memberId'>Member ID:</label>
						<InputText id='memberId' type='text' value={this.props.MEMBER.memberId} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='firstName'>First Name:</label>
						<InputText id='firstName' type='text' defaultValue={this.props.MEMBER.firstName} onChange={(e) => this.setState({ profile: { ...this.state.profile, firstName: e.target.value } })} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='middleName'>Middle Name:</label>
						<InputText id='middleName' type='text' defaultValue={this.props.MEMBER.middleName} onChange={(e) => this.setState({ profile: { ...this.state.profile, middleName: e.target.value } })} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='lastName'>Last Name:</label>
						<InputText id='lastName' type='text' defaultValue={this.props.MEMBER.lastName} onChange={(e) => this.setState({ profile: { ...this.state.profile, lastName: e.target.value } })} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='suffixName'>Suffix Name:</label>
						<InputText id='suffixName' type='text' defaultValue={this.props.MEMBER.suffixName} onChange={(e) => this.setState({ profile: { ...this.state.profile, suffixName: e.target.value } })} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='gender'>Gender:</label>
						<InputText id='gender' type='text' value={this.props.MEMBER.gender} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='dateJoined'>Date Joined:</label>
						<InputText id='dateJoined' type='text' value={this.props.MEMBER.dateJoined} />
					</div>
					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='loggedDate'>Logged Date:</label>
						<InputText id='loggedDate' type='text' value={this.props.MEMBER.loggedDate} />
					</div>

					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='memberStatus'>Member Status:</label>
						<InputText id='memberStatus' type='text' value={this.props.MEMBER.memberStatus} />
					</div>

					<div className='p-field p-col-12 p-md-4'>
						<label htmlFor='dateOut'>Date Out:</label>
						<InputText id='dateOut' type='text' value={this.props.MEMBER.dateOut === null ? 'NONE' : this.props.MEMBER.dateOut} />
					</div>
					<div className='p-field p-col-12 p-md-12'>
						<label htmlFor='loggedBy'>Logged By:</label>
						<InputText id='loggedBy' type='text' value={_.isEmpty(this.props.MEMBER.userDetails_Member) ? 'NONE' : this.props.MEMBER.userDetails_Member.fullName} />
					</div>
					<div className='p-field p-col-12 p-md-12'>
						<label htmlFor='remark'>Remark:</label>
						<InputTextarea id='remark' rows={5} cols={30} type='text' value={_.isEmpty(this.props.MEMBER.remark) ? 'NONE' : this.props.MEMBER.remark} />
					</div>
				</div>
			</UILoader>
		);
	};

	renderAddress = () => {
		let listAddress = null;
		if (!_.isEmpty(this.props.MEMBERADDRESS)) {
			listAddress = this.props.MEMBERADDRESS.map((address, index) => {
				return (
					<Panel key={index} header={`Type: ${address.type}`} style={MyStyle.Panel} toggleable={true}>
						<div className='p-fluid p-grid'>
							<div className='p-col-12 p-md-4'>
								<label>Country</label>
								<InputText id='country' type='text' value={address.country} readOnly />
							</div>
							<div className='p-col-12 p-md-4'>
								<label>City</label>
								<InputText id='city' type='text' value={address.city} readOnly />
							</div>
							<div className='p-col-12 p-md-4'>
								<label>Postal Code</label>
								<InputText id='postalcode' type='text' value={address.postalCode} readOnly />
							</div>
							<div className='p-col-12 p-md-12'>
								<label>Street Name</label>
								<InputText id='streetname' type='text' value={address.streetName} readOnly />
							</div>
						</div>
					</Panel>
				);
			});
		}
		return <>{listAddress}</>;
	};

	// private Long id;
	// private String contactId;
	// private String type;
	// private String serviceName;
	// private String detail;

	renderContact = () => {
		let listContact = null;
		if (!_.isEmpty(this.props.MEMBERCONTACT)) {
			listContact = this.props.MEMBERCONTACT.map((contact, index) => {
				return (
					<Panel key={index} header={`Type: ${contact.type}`} style={MyStyle.Panel} toggleable={true}>
						<div className='p-fluid p-grid'>
							<div className='p-col-12 p-md-4'>
								<label>ID:</label>
								<InputText type='text' value={contact.id} readOnly />
							</div>
							<div className='p-col-12 p-md-4'>
								<label>Contact ID:</label>
								<InputText type='text' value={contact.contactId} readOnly />
							</div>
							<div className='p-col-12 p-md-4'>
								<label>Service Name:</label>
								<InputText type='text' value={contact.serviceName} readOnly />
							</div>
							<div className='p-col-12 p-md-12'>
								<label>Detail:</label>
								<InputText type='text' value={contact.detail} readOnly />
							</div>
						</div>
					</Panel>
				);
			});
		}
		return <>{listContact}</>;
	};

	showError = _.memoize((message, type) => {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error found';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :' + type,
			detail: msg,
		});
	});

	showSuccess = _.memoize((type, message) => {
		this.messages.show({
			severity: 'success',
			summary: 'Success Message :' + type,
			detail: message,
		});
	});

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message, 'Member');
			}
		}
		if (this.props.MAERROR_MESSAGE !== prevProps.MAERROR_MESSAGE) {
			if (this.props.MAERROR) {
				this.showError(this.props.MAERROR_MESSAGE.message, 'Member Address');
			}
		}

		if (this.props.MCERROR_MESSAGE !== prevProps.MCERROR_MESSAGE) {
			if (this.props.MCERROR) {
				this.showError(this.props.MCERROR_MESSAGE.message, 'Member Contact');
			}
		}
		if (this.props.MEMBER !== prevProps.MEMBER) {
			if (this.props.FETCHTYPE === MEMBER_UPDATE) {
				this.showSuccess('Member', 'Successfully Update Member!');
			}
		}
		if (this.props.MEMBERADDRESS !== prevProps.MEMBERADDRESS) {
			if (this.props.MAFETCHTYPE === MEMBERADDRESS_SAVE) {
				this.showSuccess('Member Address', 'Successfully Save Member Address');
			}
		}
		if (this.props.MEMBERCONTACT !== prevProps.MEMBERCONTACT) {
			if (this.props.MCFETCHTYPE === MEMBERCONTACT_SAVE) {
				this.showSuccess('Member Contact', 'Successfully Save Member Contact');
			}
		}
	}

	componentWillUnmount() {
		this.props.mcReset();
	}

	onClickUpdateProfile = (e) => {
		e.preventDefault();
		const { memberId } = this.props.match.params;
		this.props.updateMember(memberId, this.state.profile);
	};

	getPDF = async (memberId) => {
		await Axios.get(`http://localhost:8080/ptm/api/reports/member/${memberId}`, {
			responseType: 'blob',
			headers: {
				Accept: 'application/pdf',
				Authorization: this.props.TOKEN,
			},
		})
			.then((response) => {
				const file = new Blob([response.data], { type: 'application/pdf', title: 'MemberInfoReport' });
				const fileURL = URL.createObjectURL(file);
				this.setState({ reportBlob: fileURL });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	renderPDF = () => {
		return (
			<div className='p-col-12 p-md-12 p-lg-12 p-col-align-center '>
				<div className='box'>
					<iframe title='Member Info Report' id='memberinforeport' type='application/pdf' src={_.isEmpty(this.state.reportBlob) ? null : this.state.reportBlob} height='700px' width='100%' loading='lazy' />
				</div>
			</div>
		);
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12'>
					<Messages ref={(el) => (this.messages = el)}></Messages>
					<TabView style={{ marginLeft: '0' }} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
						<TabPanel header='Profile' leftIcon='pi pi-fw pi-user'>
							<Fieldset legend='Member Profile'>{this.renderProfile()}</Fieldset>
							<div className='button' style={MyStyle.DivButton}>
								<span>
									<Button icon='pi pi-save' label='Update Profile' style={MyStyle.Button} onClick={this.onClickUpdateProfile} />
								</span>
							</div>
						</TabPanel>
						<TabPanel header='Address' leftIcon='pi pi-fw pi-list'>
							<Fieldset legend='Member Address'>{this.renderAddress()}</Fieldset>
							<div className='button' style={MyStyle.DivButton}>
								<span>
									<Button icon='pi pi-plus' label='Add Address' style={MyStyle.Button} onClick={this.addAddress} />
								</span>
							</div>
						</TabPanel>
						<TabPanel header='Contact' leftIcon='pi pi-fw pi-user-edit'>
							<Fieldset legend='Member Contact'>{(() => this.renderContact())()}</Fieldset>
							<div className='button' style={MyStyle.DivButton}>
								<span>
									<Button icon='pi pi-plus' label='Add Contact' style={MyStyle.Button} onClick={this.addContact} />
								</span>
							</div>
						</TabPanel>
						<TabPanel header='Report' leftIcon='pi pi-fw pi-file-pdf'>
							{(() => this.renderPDF())()}
						</TabPanel>
					</TabView>
					<Dialog id='address' header='Add New Address' visible={this.state.addressDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideAddressDialog}>
						<MemberAddressDialog hidethis={this.hideAddressDialog} memberId={this.props.match.params.memberId} />
					</Dialog>
					<Dialog id='contact' header='Add New Contact' visible={this.state.contactDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideContactDialog}>
						<MemberContactDialog hidethis={this.hideContactDialog} memberId={this.props.match.params.memberId} />
					</Dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { memberId } = ownProps.match.params;
	return {
		MEMBER: state.MEMBERS.membersResponse[memberId],
		FETCHTYPE: state.MEMBERS.fetchType,
		ERROR: state.MEMBERS.fetchError,
		ERROR_MESSAGE: state.MEMBERS.fetchErrorMessage,
		MEMBERADDRESS: Object.values(state.MEMBERADDRESSES.memberaddressesResponse),
		MAFETCHTYPE: state.MEMBERADDRESSES.fetchType,
		MAERROR: state.MEMBERADDRESSES.fetchError,
		MAERROR_MESSAGE: state.MEMBERADDRESSES.fetchErrorMessage,
		MEMBERCONTACT: Object.values(state.MEMBERCONTACTS.membercontactsResponse),
		MCFETCHTYPE: state.MEMBERCONTACTS.fetchType,
		MCERROR: state.MEMBERCONTACTS.fetchError,
		MCERROR_MESSAGE: state.MEMBERCONTACTS.fetchErrorMessage,
		TOKEN: state.LOGIN_AUTHENTICATION.loginState.loginResponse.authorization,
	};
};

const mapDispatchToProps = { getMemberByMemberId, getAllMemberAddressByMemberId, maReset, getAllMemberContactByMemberId, mcReset, updateMember };

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo);
