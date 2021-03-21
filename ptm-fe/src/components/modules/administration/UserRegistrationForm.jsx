import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { errorEmail, warningAol, passwordsMustMatch, minLength1, minLength5, required } from '../../messages/errorFieldNotification';
import { connect } from 'react-redux';
import { createUser } from '../../../redux/actions/UserActions';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Messages } from "primereact/messages";
import { Dropdown } from 'primereact/dropdown';
import { USER_SAVE } from '../../../redux/constants/UsersConstants';
import UILoader from '../tools/UILoader';

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
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" },
	divPaddingTop:{ paddingTop: "30px" },
	lable:{marginLeft:'10px'},
	divMargin:{marginLeft:'20px'},
}

class UserRegistrationForm extends Component {

	state = {
		sn: null,
	}

	onSubmit = (formValues) => {
		this.props.createUser(formValues)
	};

	renderInput({ input, label, meta: { touched, error, warning } }) {
		return (
			<div className='p-col-12 p-md-4' style={MyStyle.top}>
				<span className='p-float-label'>
					<InputText
					 {...input} 
					 id={label}
					 className={error ? `p-invalid` : undefined}
					 />
					<label htmlFor={label}>{label}</label>
				</span>
				{touched &&
					((error && (
						<span>
							{/* <div className='isa_error'>
								<i className='pi pi-times'></i>
								{error}
							</div> */}
							<small className="p-error">{error}</small>
						</span>
					)) ||
						(warning && (
							<span>
								{/* <div className='isa_warning'>
									<i className='pi pi-question'></i>
									{warning}
								</div> */}
								<small className="p-error">{warning}</small>
							</span>
						)))}
			</div>
		);
	}

	renderEmail({ input, label, meta: { touched, error, warning } }) {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.top}>
				<span className='p-float-label'>
					<InputText {...input} 
					id={label}
					 className={error ? `p-invalid` : undefined}
					/>
					<label htmlFor={label}>{label}</label>
				</span>
				{touched &&
					((error && (
						<span>
							{/* <div className='isa_error'>
								<i className='pi pi-times'></i>
								{error}
							</div> */}
								<small className="p-error">{error}</small>
						</span>
					)) ||
						(warning && (
							<span>
								{/* <div className='isa_warning'>
									<i className='pi pi-question'></i>
									{warning}
								</div> */}
									<small className="p-error">{warning}</small>
							</span>
						)))}
			</div>
		);
	}

	renderPassword({ input, label, meta: { touched, error, warning } }) {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.top}>
				<span className='p-float-label'>
					<Password {...input} 
					id={label}
					 className={error ? `p-invalid` : undefined}
					/>
					<label htmlFor={label}>{label}</label>
				</span>
				{touched &&
					((error && (
						<span>
							{/* <div className='isa_error'>
								<i className='pi pi-times'></i>
								{error}
							</div> */}
							<small className="p-error">{error}</small>
						</span>
					)) ||
						(warning && (
							<span>
								{/* <div className='isa_warning'>
									<i className='pi pi-question'></i>
									{warning}
								</div> */}
								<small className="p-error">{warning}</small>
							</span>
						)))}
			</div>
		);
	}

	onChangeSN = (value) => {
		this.setState({sn : value});
	}

	renderDropdown = ({input, data,valueField, textField}) => {
		return (
			<div className='p-col-12 p-md-6' style={MyStyle.top}>		
				<span className="p-float-label">			
					<Dropdown    
						{...input}    
						id="dropdown"              
                        optionLabel={textField}
                        value={valueField} 
                        options={data} 
						onChange={(e) => this.onChangeSN(e.value)}							
						onBlur={(e) => input.onBlur(valueField)}						
						showClear />	
						<label htmlFor="dropdown">Suffix Name:</label>		
				</span>		
			</div>
		);
    }    

	showError(message) {
        let msg = message;
        if(_.isEmpty(message))
            msg = "Error User Registration";
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message :",
            detail: msg
        });
    }

	showSuccess() {
        this.messages.show({         
            severity: "success",
            summary: "Success Message :",
            detail: "_Successfully Create User!"
        });		
    }	

	componentDidUpdate(prevProps, prevState) {
        if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
            if (this.props.ERROR) {
                this.showError(this.props.ERROR_MESSAGE.message);
            }
        }
		if(this.props.USERS !== prevProps.USERS){
			if(this.props.FETCHTYPE === USER_SAVE )	{				
				this.setState({sn: null});
				this.showSuccess();
			}
		}
    }

	render() {
		return (	
			
			<UILoader blockui='USER_LOADING' unblockui={['USER_ERROR', 'USER_SAVE']}>
				<Panel header={this.props.title}>
					<Messages ref={el => (this.messages = el)}></Messages>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Fieldset legend='Create User Form'>
						<div className='p-grid p-fluid'>
							<Field name='firstName' label='First Name:' component={this.renderInput} validate={minLength1} />
							<Field name='middleName' label='Middle Name:' component={this.renderInput} validate={minLength1} />
							<Field name='lastName' label='Last Name:' component={this.renderInput} validate={minLength1} />
							<Field
								name='suffixName'								
								component={this.renderDropdown}
								data={suffix}
								valueField={this.state.sn}
								textField='label'
							/>
							<Field name='email' type='email' label='E-mail Address:' component={this.renderEmail} validate={errorEmail} warn={warningAol} />
							<Field name='password' type='password' label='Password:' component={this.renderPassword} validate={minLength5} />
							<Field name='confirmedpassword' type='password' label='Confirmed Password:' component={this.renderPassword} validate={[required,passwordsMustMatch]} />
						</div>
					</Fieldset>
					<div className='button' style={MyStyle.ButtonStyle}>
						<span>
							<Button 		
								disabled={this.props.pristine || this.props.submitting}		
								icon='pi pi-save'			
								label='Save' 
								style={MyStyle.Button} 
								/>
						</span>
					</div>
					</form>
				</Panel>		
				</UILoader>	
		);
	}
}

const userregistrationForm = reduxForm({
	form: 'userregistrationForm',
})(UserRegistrationForm);

const mapStateToProps = (state) => {
	return {
		USERS: state.USERS.usersResponse,
		ERROR: state.USERS.fetchError,
        ERROR_MESSAGE: state.USERS.fetchErrorMessage,
		FETCHTYPE: state.USERS.fetchType,
	};
};

const mapDispatchToProps = { createUser };

export default connect(mapStateToProps, mapDispatchToProps)(userregistrationForm);
