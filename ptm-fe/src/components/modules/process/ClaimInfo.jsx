import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { getClaimByClaimId } from '../../../redux/actions/ClaimActions';
import { TabMenu } from 'primereact/tabmenu';
import Axios from 'axios';

const items = [
	{ label: 'Claim Information', icon: 'pi pi-fw pi-info-circle' },
	{ label: 'Claim Report', icon: 'pi pi-fw pi-file-pdf' },
];

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

	divform: { paddingTop: '20px' },
	ShortDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	fieldDivButton: { paddingTop: '10px', paddingBottom: '35px' },
	fieldButton: { marginRight: '.25em', float: 'right', width: '250px' },
	headerDiv: { display: 'flex', justifyContent: 'space-between' },
	headerButton: { width: '250px', float: 'left' },
};

class ClaimInfo extends Component {
	state = {
		activeItem: {},
		activeLabel: '',
		reportBlob: {},
	};

	componentDidMount() {
		const { claimId } = this.props.match.params;
		this.props.getClaimByClaimId(claimId);
		this.getPDF(claimId);
	}

	renderInfo = () => {
		return (
			<Panel header={`Claim ID: ${this.props.CLAIM.claimId}`}>
				<Fieldset legend='Claim Details'>
					<div className='p-fluid p-grid'>
						<div className='p-field p-col-12 p-md-6'>
							<h2>{this.props.CLAIM.claimId}</h2>
							<br />
							<label>{this.props.CLAIM.id}</label>
							<br />
							<label>{this.props.CLAIM.loggedDate}</label>
							<br />
							<label>{this.props.CLAIM.totalAmount}</label>
						</div>
						<div className='p-field p-col-12 p-md-6'>
							<label>User ID: {this.props.CLAIM.userDetails_Claim.userId}</label>
							<br />
							<label>ID: {this.props.CLAIM.userDetails_Claim.id}</label>
							<br />
							<label>Logged By: {this.props.CLAIM.userDetails_Claim.fullName}</label>
						</div>
					</div>
				</Fieldset>
			</Panel>
		);
	};

	renderReport = () => {
		return <iframe title='Claim Info Report' id='boardinforeport' type='application/pdf' src={_.isEmpty(this.state.reportBlob) ? null : this.state.reportBlob} height='700px' width='100%' loading='lazy' />;
	};

	getPDF = async (claimId) => {
		await Axios.get(`${process.env.BACK_END_URL}/reports/claim/${claimId}`, {
			responseType: 'blob',
			headers: {
				Accept: 'application/pdf',
				Authorization: this.props.TOKEN,
			},
		})
			.then((response) => {
				const file = new Blob([response.data], { type: 'application/pdf', title: 'ClaimInfoReport' });
				const fileURL = URL.createObjectURL(file);
				this.setState({ reportBlob: fileURL });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12'>
					<TabMenu
						model={items}
						activeItem={this.state.activeItem}
						onTabChange={(e) => {
							this.setState({ activeItem: e.value });
							this.setState({ activeLabel: e.value.label });
						}}
					/>
					{(() => {
						switch (this.state.activeLabel) {
							case 'Claim Report':
								return this.renderReport();
							default:
								return this.renderInfo();
						}
					})()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { claimId } = ownProps.match.params;
	return {
		CLAIM: state.CLAIMS.claimsResponse[claimId],
		FETCHTYPE: state.CLAIMS.fetchType,
		ERROR: state.CLAIMS.fetchError,
		ERROR_MESSAGE: state.CLAIMS.fetchErrorMessage,
		TOKEN: state.LOGIN_AUTHENTICATION.loginState.loginResponse.authorization,
	};
};

const mapDispatchToProps = { getClaimByClaimId };

export default connect(mapStateToProps, mapDispatchToProps)(ClaimInfo);
