import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveClaim } from '../../../redux/actions/ClaimActions';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { CLAIM_SAVE } from '../../../redux/constants/ClaimConstants';
import _ from 'lodash';
import { Chips } from 'primereact/chips';

const MyStyle = {
	ButtonStyle: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '150px' },
	top: { paddingTop: '20px' },
	ttop: { position: 'top' },
	twidth: { width: '100%' },
	divPaddingTop: { paddingTop: '30px' },
	lable: { marginLeft: '10px' },
	divMargin: { marginLeft: '20px' },
};

class ClaimForm extends Component {
	state = {
		memberId: '',
		members: [],
	};

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Claim Registration';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :',
			detail: msg,
		});
	}

	showSuccess() {
		this.messages.show({
			sticky: true,
			severity: 'success',
			summary: 'Success Message :',
			detail: 'Successfully Save Claim!',
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
		if (this.props.CLAIMS !== prevProps.CLAIMS) {
			if (this.props.FETCHTYPE === CLAIM_SAVE) {
				this.setState({ memberId: '' });
				this.setState({ members: [] });
				this.showSuccess();
			}
		}
	}

	onSave = async (event) => {
		event.preventDefault();
		await this.props.saveClaim(this.state.memberId, { members: this.state.members });
	};

	render() {
		return (
			<UILoader blockui='CLAIM_LOADING' unblockui={['CLAIM_ERROR', 'CLAIM_SAVE']}>
				<Messages ref={(el) => (this.messages = el)}></Messages>
				<Panel header={this.props.title}>
					<div className='p-grid p-fluid'>
						<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
							<span className='p-float-label'>
								<InputText in='recruiter' tooltip='EnterRecruiter' tooltipOptions={MyStyle.ttop} style={MyStyle.twidth} value={this.state.memberId} onChange={(e) => this.setState({ memberId: e.target.value })} />
								<label htmlFor='recruiter'>Enter Recruiter</label>
							</span>
						</div>
						<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
							<Chips value={this.state.members} onChange={(e) => this.setState({ members: e.value })} separator=',' />
						</div>
					</div>
					<div className='button' style={MyStyle.ButtonStyle}>
						<span>
							<Button disabled={_.isEmpty(this.state.memberId || this.state.members)} icon='pi pi-save' label='Save' style={MyStyle.Button} onClick={this.onSave} />
						</span>
					</div>
				</Panel>
			</UILoader>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		CLAIMS: state.CLAIMS.claimsResponse,
		ERROR: state.CLAIMS.fetchError,
		ERROR_MESSAGE: state.CLAIMS.fetchErrorMessage,
		FETCHTYPE: state.CLAIMS.fetchType,
	};
};

const mapDispatchToProps = { saveClaim };

export default connect(mapStateToProps, mapDispatchToProps)(ClaimForm);
