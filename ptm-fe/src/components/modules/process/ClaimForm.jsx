import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveClaim } from '../../../redux/actions/ClaimActions';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';
import { CLAIM_SAVE } from '../../../redux/constants/ClaimConstants';
import _ from 'lodash';

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

const modes = [
	{ name: 'Personal', value: 'PERSONAL' },
	{ name: 'GCash', value: 'GCASH' },
	{ name: 'Remittance', value: 'REMITTANCE' },
	{ name: 'Money Transfer', value: 'MONEYTRANSFER' },
];

class ClaimForm extends Component {
	state = {
		boardId: '',
		modeOfClaim: null,
		details: '',
		remark: '',
		claimedAmount: 0.0,
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
				this.setState({ boardId: '' });
				this.setState({ modeOfClaim: null });
				this.setState({ details: '' });
				this.setState({ remark: '' });
				this.setState({ claimedAmount: 0.0 });
				this.showSuccess();
			}
		}
	}

	onSave = async (event) => {
		event.preventDefault();
		await this.props.saveClaim(this.state.memberId, { members: this.state.members });
	};

	modeChange = (event) => {
		this.setState({ modeOfClaim: event.value });
	};

	render() {
		return (
			<UILoader blockui='CLAIM_LOADING' unblockui={['CLAIM_ERROR', 'CLAIM_SAVE']}>
				<Messages ref={(el) => (this.messages = el)}></Messages>
				<Panel header={this.props.title}>
					<div className='p-grid p-fluid'>
						<div className='p-col-12 p-md-6' style={MyStyle.divPaddingTop}>
							<span className='p-float-label'>
								<InputText in='boardId' tooltip='BoardId' tooltipOptions={MyStyle.ttop} style={MyStyle.twidth} value={this.state.boardId} onChange={(e) => this.setState({ boardId: e.target.value })} />
								<label htmlFor='boardId'>BoardId</label>
							</span>
						</div>
						<div className='p-col-12 p-md-6' style={MyStyle.divPaddingTop}>
							<Dropdown optionLabel='name' optionValue='value' value={this.state.modeOfClaim} options={modes} onChange={this.modeChange} placeholder='Select Mode' />
						</div>
						<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
							<span className='p-float-label'>
								<InputText in='details' tooltip='Details' tooltipOptions={MyStyle.ttop} style={MyStyle.twidth} value={this.state.details} onChange={(e) => this.setState({ details: e.target.value })} />
								<label htmlFor='recruiter'>Details</label>
							</span>
						</div>
						<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
							<span className='p-float-label'>
								<InputTextarea in='remark' tooltip='Enter Remark' tooltipOptions={MyStyle.ttop} style={MyStyle.twidth} rows={5} cols={30} value={this.state.remark} onChange={(e) => this.setState({ remark: e.target.value })} />
								<label htmlFor='remark'>Enter Remark</label>
							</span>
						</div>
						<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
							<InputNumber mode='decimal' minFractionDigits={2} maxFracionDigits={4} tooltip='Enter Amount' tooltipOptions={MyStyle.ttop} style={MyStyle.twidth} value={this.state.claimedAmount} onValueChange={(e) => this.setState({ claimedAmount: e.target.value })} />
						</div>
					</div>
					<div className='button' style={MyStyle.ButtonStyle}>
						<span>
							<Button disabled={_.isEmpty(this.state.modeOfClaim || this.state.boardId)} icon='pi pi-save' label='Save' style={MyStyle.Button} onClick={this.onSave} />
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
