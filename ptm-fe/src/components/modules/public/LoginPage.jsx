import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAuthentication } from '../../../redux/actions/LoginActions';
import { Field, reduxForm } from 'redux-form';
import { errorEmail, warningAol, minLength5 } from '../../messages/errorFieldNotification';
import history from '../../../routes/history';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import HeaderProgressBar from '../tools/HeaderProgressBar';
import { motion } from 'framer-motion';
import _ from 'lodash';

const MyStyle = {
	LoginSpanStyle: { width: '100%' },
	DivUsernameStyle: { paddingTop: '20px' },
	DivPasswordStyle: { paddingTop: '17px' },
	ButtonDivStyle: { paddingTop: '10px', paddingBottom: '35px' },
	loginButton: { float: 'right' },
	BoxDivStyle: { paddingTop: '1em' },
	LinkStyleLeft: { display: 'block', marginLeft: '.25em', float: 'left' },
	LinkStyleRight: { display: 'block', marginRight: '.25em', float: 'right' },
	LogoStyle: { display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2em', paddingBottom: '2em', width: '30%' },
};

const renderPassword = ({ input, label, meta: { touched, error, warning } }) => {
	return (
		<div className='p-col-12 p-md-12' style={MyStyle.DivPasswordStyle}>
			<div className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<i className='pi pi-lock'></i>
				</span>
				<span className='p-float-label' style={MyStyle.LoginSpanStyle}>
					<Password {...input} className={error ? `p-invalid` : undefined} feedback={false} toggleMask />
					<label htmlFor={label}>{label}</label>
				</span>
			</div>
			{touched &&
				((error && (
					<span>
						{/* <div className="isa_error">
                        <i className="pi pi-times"></i>
                        {error}
                    </div> */}
						<small className='p-error'>{error}</small>
					</span>
				)) ||
					(warning && (
						<span>
							{/* <div className="isa_warning">
                        <i className="pi pi-question"></i>
                        {warning}
                    </div> */}
							<small className='p-error'>{warning}</small>
						</span>
					)))}
		</div>
	);
};

const renderEmail = ({ input, label, meta: { touched, error, warning } }) => {
	return (
		<div className='p-col-12 p-md-12' style={MyStyle.DivUsernameStyle}>
			<div className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<i className='pi pi-user'></i>
				</span>
				<span className='p-float-label' style={MyStyle.LoginSpanStyle}>
					<InputText {...input} className={error ? `p-invalid` : undefined} />
					<label htmlFor={label} className='p-d-block'>
						{label}
					</label>
				</span>
			</div>
			{touched &&
				((error && (
					<span>
						<small className='p-error'>{error}</small>
					</span>
				)) ||
					(warning && (
						<span>
							<small className='p-error'>{warning}</small>
						</span>
					)))}
		</div>
	);
};

class LoginPage extends Component {
	componentDidMount() {
		//console.log(process.env.BACK_END_URL);
		if (this.props.LOGIN_AUTHENTICATION.loginState.isAuthenticated) {
			history.push('/app/');
		}
	}

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Authentication Failed';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :',
			detail: msg,
		});
	}

	onSubmit = async (formValues) => {
		await this.props.LoginAuthentication(formValues);
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
	}

	render() {
		return (
			<>
				<HeaderProgressBar nameofbar={'loginBar'} />
				<div className='p-grid p-dir-col p-nogutter'>
					<motion.div initial={{ y: -250 }} animate={{ y: 0 }} transition={{ delay: 0.1, type: 'spring' }} className='p-col-12 p-lg-4 p-col-align-center'>
						<img src='assets/Logo.png' alt='Logo' style={MyStyle.LogoStyle} />
					</motion.div>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className='p-col-12 p-md-3 p-lg-4 p-col-align-center'>
						<div className='box'>
							<Panel header='Payout Team Manangement'>
								<Messages ref={(el) => (this.messages = el)}></Messages>
								<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
									<Fieldset legend='Login Form'>
										<div className='p-grid p-fluid'>
											<Field name='email' type='email' label='E-mail' component={renderEmail} validate={[errorEmail, minLength5]} warn={warningAol} />
											<Field name='password' type='current-password' label='Password' component={renderPassword} validate={minLength5} />
										</div>
									</Fieldset>
									<div className='button' style={MyStyle.ButtonDivStyle}>
										<div style={MyStyle.loginButton}>
											<motion.div
												whileHover={{
													scale: 1.1,
													textShadow: '0px 0px 8px rgb(255,255,255)',
													boxShadow: '0px 0px 8px rgb(255,255,255)',
												}}>
												<Button label='Login' icon='pi pi-sign-in' />
											</motion.div>
										</div>
									</div>
								</form>
							</Panel>
						</div>
					</motion.div>
				</div>
			</>
		);
	}
}

const LoginForm = reduxForm({
	form: 'loginpage',
})(LoginPage);

const mapStateToProps = (state) => {
	return {
		LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
		ERROR: state.LOGIN_AUTHENTICATION.loginState.fetchError,
		ERROR_MESSAGE: state.LOGIN_AUTHENTICATION.loginState.fetchErrorMessage,
	};
};

const mapDispatchToProps = { LoginAuthentication };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
