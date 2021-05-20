import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveRecruitment } from '../../../redux/actions/RecruitmentActions';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { RECRUITMENT_SAVE } from '../../../redux/constants/RecruitmentConstants';
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

class RecruitmentForm extends Component {
	state = {
		memberId: '',
		members: [],
	};

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Recruitment Registration';
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
			detail: 'Successfully Save Recruitment!',
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
		if (this.props.RECRUITMENTS !== prevProps.RECRUITMENTS) {
			if (this.props.FETCHTYPE === RECRUITMENT_SAVE) {
				this.setState({ memberId: null });
				this.setState({ members: [] });
				this.showSuccess();
			}
		}
	}

	onSave = async (event) => {
		event.preventDefault();
		await this.props.saveRecruitment(this.state.memberId, { members: this.state.members });
	};

	render() {
		return (
			<UILoader blockui='RECRUITMENT_LOADING' unblockui={['RECRUITMENT_ERROR', 'RECRUITMENT_SAVE']}>
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
		RECRUITMENTS: state.RECRUITMENTS.membersResponse,
		ERROR: state.RECRUITMENTS.fetchError,
		ERROR_MESSAGE: state.RECRUITMENTS.fetchErrorMessage,
		FETCHTYPE: state.RECRUITMENTS.fetchType,
	};
};

const mapDispatchToProps = { saveRecruitment };

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentForm);
