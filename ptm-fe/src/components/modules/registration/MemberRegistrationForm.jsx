import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveMember } from '../../../redux/actions/MemberActions';
import { Field, reduxForm } from 'redux-form';
import { maxLength150, minLength1 } from '../../messages/errorFieldNotification';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Messages } from 'primereact/messages';
import { MEMBER_SAVE } from '../../../redux/constants/MemberConstants';

const suffix = [
	{ label: 'NONE', value: '' },
	{ label: 'JR', value: 'JR' },
	{ label: 'SR', value: 'SR' },
	{ label: 'I', value: 'I' },
	{ label: 'II', value: 'II' },
	{ label: 'III', value: 'III' },
	{ label: 'IV', value: 'IV' },
];

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

class MemberRegistrationForm extends Component {
	state = {
		sn: null,
		sex: null,
	};

	onSubmit = (formValues) => {
		this.props.saveMember(formValues);
	};

	renderRadioButton = ({ input, data }) => {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.divPaddingTop}>
				<div className='p-field-radiobutton'>
					<div>
						<RadioButton
							{...input}
							inputId='MALE'
							name={data}
							value='MALE'
							onChange={(e) => {
								this.onChangeSex(e.value);
								input.onChange(e.value);
							}}
							checked={data === 'MALE'}
						/>
						<label style={MyStyle.lable} htmlFor='MALE'>
							MALE
						</label>
					</div>

					<div style={MyStyle.divMargin}>
						<RadioButton
							{...input}
							inputId='FEMALE'
							name={data}
							value='FEMALE'
							onChange={(e) => {
								this.onChangeSex(e.value);
								input.onChange(e.value);
							}}
							checked={data === 'FEMALE'}
						/>
						<label style={MyStyle.lable} htmlFor='FEMALE'>
							FEMALE
						</label>
					</div>
				</div>
				{/* <div className="p-field-radiobutton">
					
                </div> */}
			</div>
		);
	};

	onChangeSex = (value) => {
		this.setState({ sex: value });
	};

	onChangeSN = (value) => {
		this.setState({ sn: value });
	};

	renderDropdown = ({ input, data, valueField, textField }) => {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.divPaddingTop}>
				<Dropdown {...input} optionLabel={textField} value={valueField} options={data} onChange={(e) => this.onChangeSN(e.value)} onBlur={(e) => input.onBlur(valueField)} showClear />
			</div>
		);
	};

	renderInput({ input, label, meta: { touched, error, warning } }) {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.divPaddingTop}>
				<span className='p-float-label'>
					<InputText {...input} className={error ? `p-invalid` : undefined} id={label} style={MyStyle.twidth} tooltip={label} tooltipOptions={MyStyle.ttop} />
					<label htmlFor={label}>{label}</label>
				</span>
				{touched &&
					((error && (
						<span>
							{/* <div className='isa_error'>
								<i className='pi pi-times'></i>
								{error}
							</div> */}
							<small className='p-error'>{error}</small>
						</span>
					)) ||
						(warning && (
							<span>
								{/* <div className='isa_warning'>
									<i className='pi pi-question'></i>
									{warning}
								</div> */}
								<small className='p-error'>{warning}</small>
							</span>
						)))}
			</div>
		);
	}

	renderTextArea({ input, label, meta: { touched, error, warning } }) {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.top}>
				<span className='p-float-label'>
					<InputTextarea {...input} className={error ? `p-invalid` : undefined} style={MyStyle.twidth} rows={5} cols={30} tooltip={label} tooltipOptions={MyStyle.ttop} />
					<label htmlFor='in'>{label}</label>
				</span>
				{touched &&
					((error && (
						<span>
							{/* <div className='isa_error'>
								<i className='pi pi-times'></i>
								{error}
							</div> */}
							<small className='p-error'>{error}</small>
						</span>
					)) ||
						(warning && (
							<span>
								{/* <div className='isa_warning'>
									<i className='pi pi-question'></i>
									{warning}
								</div> */}
								<small className='p-error'>{warning}</small>
							</span>
						)))}
			</div>
		);
	}

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Member Registration';
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
			detail: 'Successfully Add New Member',
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
		if (this.props.MEMBERS !== prevProps.MEMBERS) {
			if (this.props.FETCHTYPE === MEMBER_SAVE) {
				this.setState({ sex: null });
				this.setState({ sn: null });
				this.showSuccess();
			}
		}
	}

	render() {
		return (
			<UILoader blockui='MEMBER_LOADING' unblockui={['MEMBER_ERROR', 'MEMBER_SAVE']}>
				<Panel header={this.props.title}>
					<Messages ref={(el) => (this.messages = el)}></Messages>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className='p-grid p-fluid'>
							<Field name='firstName' label='First Name' component={this.renderInput} validate={minLength1} />
							<Field name='middleName' label='Middle Name' component={this.renderInput} validate={minLength1} />
							<Field name='lastName' label='Last Name' component={this.renderInput} validate={minLength1} />
							<Field name='suffixName' component={this.renderDropdown} data={suffix} valueField={this.state.sn} textField='label' />
							<Field name='gender' label='Gender' component={this.renderRadioButton} data={this.state.sex} />
							<Field name='remark' label='Remark' component={this.renderTextArea} validate={[minLength1, maxLength150]} />
						</div>
						<div className='button' style={MyStyle.ButtonStyle}>
							<span>
								<Button disabled={this.props.pristine || this.props.submitting} icon='pi pi-save' label='Save' style={MyStyle.Button} />
							</span>
						</div>
					</form>
				</Panel>
			</UILoader>
		);
	}
}

const newMemberForm = reduxForm({
	form: 'addNewMember',
})(MemberRegistrationForm);

const mapStateToProps = (state) => {
	return {
		MEMBERS: state.MEMBERS.membersResponse,
		ERROR: state.MEMBERS.fetchError,
		ERROR_MESSAGE: state.MEMBERS.fetchErrorMessage,
		FETCHTYPE: state.MEMBERS.fetchType,
	};
};

const mapDispatchToProps = { saveMember };

export default connect(mapStateToProps, mapDispatchToProps)(newMemberForm);
