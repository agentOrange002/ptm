import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveBoard } from '../../../redux/actions/BoardActions';
import { getAllCategories } from '../../../redux/actions/CategoryActions';
import { Field, reduxForm } from 'redux-form';
import { minLength1, maxLength150 } from '../../messages/errorFieldNotification';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import { BOARD_SAVE } from '../../../redux/constants/BoardConstants';
import { Dropdown } from 'primereact/dropdown';
import _ from 'lodash';

const MyStyle = {
	render: { paddingTop: '20px' },
	renderInput: { paddingTop: '30px' },
	inputwidth: { width: '100%' },
	tooltip: { position: 'top' },
	button: {
		marginRight: '.25em',
		float: 'right',
		width: '150px',
	},
	divButton: {
		paddingTop: '10px',
		paddingBottom: '35px',
	},
	divStyle: { width: '250px', height: '20px' },
};

class BoardRegistrationForm extends Component {
	state = {
		category: null,
	};

	async componentDidMount() {
		if (_.isEmpty(this.props.CATEGORIES)) await this.props.getAllCategories();
	}

	onSubmit = (formValues) => {
		this.props.saveBoard(formValues);
	};

	renderInput = ({ input, label, meta: { touched, error, warning } }) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.renderInput}>
				<span className='p-float-label'>
					<InputText {...input} className={error ? `p-invalid` : undefined} id={label} style={MyStyle.inputwidth} tooltip={label} tooltipOptions={MyStyle.tooltip} />
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
	};

	renderTextArea = ({ input, label, meta: { touched, error, warning } }) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.render}>
				<span className='p-float-label'>
					<InputTextarea {...input} className={error ? `p-invalid` : undefined} style={MyStyle.inputwidth} rows={5} cols={30} tooltip={label} tooltipOptions={MyStyle.tooltip} />
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
	};

	renderDropdown = ({ input, data, valueField, textField }) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.render}>
				<Dropdown
					{...input}
					value={valueField}
					options={data}
					optionLabel={textField}
					filter
					filterBy={textField}
					onChange={this.onChangeCategory}
					onBlur={(e) => {
						if (!_.isEmpty(valueField)) {
							input.onBlur(valueField.categoryId);
						}
					}}
					placeholder='Select a Category'
					valueTemplate={this.selectedCategoryTemplate}
					itemTemplate={this.optionTemplate}
				/>
			</div>
		);
	};

	onChangeCategory = (event) => {
		if (!_.isEmpty(event.value)) this.setState({ category: event.value });
	};

	selectedCategoryTemplate = (option, props) => {
		if (option) {
			return (
				<div style={MyStyle.divStyle}>
					<div>{option.categoryName}</div>
				</div>
			);
		}
		return <span>{props.placeholder}</span>;
	};

	optionTemplate = (option) => {
		return (
			<div style={MyStyle.divStyle}>
				<div>{option.categoryName}</div>
			</div>
		);
	};

	// // <Dropdown
	// 		value={selectedCountry}
	// 		options={countries}
	// 		onChange={onCountryChange}
	// 		optionLabel="name"
	// 		filter showClear
	// 		filterBy="name"
	// 		placeholder="Select a Country"
	// //
	// 	valueTemplate={selectedCountryTemplate}
	// 	itemTemplate={countryOptionTemplate} />

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Board Registration';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :',
			detail: msg,
		});
	}

	showSuccess() {
		this.messages.show({
			severity: 'success',
			summary: 'Success Message :',
			detail: 'Successfully Add New Board',
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
		if (this.props.BOARDS !== prevProps.BOARDS) {
			if (this.props.FETCHTYPE === BOARD_SAVE) {
				this.showSuccess();
				this.setState({ category: null });
			}
		}
	}

	render() {
		return (
			<UILoader blockui='BOARD_LOADING' unblockui={['BOARD_ERROR', 'BOARD_SAVE']}>
				<Panel header={this.props.title}>
					<Messages ref={(el) => (this.messages = el)}></Messages>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className='p-grid p-fluid'>
							<Field name='boardName' label='Board Name' component={this.renderInput} validate={minLength1} />
							<Field name='categoryId' component={this.renderDropdown} data={this.props.CATEGORIES} valueField={this.state.category} textField='categoryName' />
							<Field name='remark' label='Remark' component={this.renderTextArea} validate={[minLength1, maxLength150]} />
						</div>
						<div className='button' style={MyStyle.divButton}>
							<span>
								<Button disabled={this.props.pristine || this.props.submitting} icon='pi pi-save' label='Save' style={MyStyle.button} />
							</span>
						</div>
					</form>
				</Panel>
			</UILoader>
		);
	}
}

const newBoardForm = reduxForm({
	form: 'addNewBoard',
})(BoardRegistrationForm);

const mapStateToProps = (state) => {
	return {
		LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
		BOARDS: state.BOARDS.boardsResponse,
		ERROR: state.BOARDS.fetchError,
		ERROR_MESSAGE: state.BOARDS.fetchErrorMessage,
		FETCHTYPE: state.BOARDS.fetchType,
		CATEGORIES: Object.values(state.CATEGORIES.categoriesResponse).map(({ id, categoryType, categoryDescription, registeredDate, ...rest }) => ({ ...rest })),
	};
};

const mapDispatchToProps = { saveBoard, getAllCategories };

export default connect(mapStateToProps, mapDispatchToProps)(newBoardForm);
