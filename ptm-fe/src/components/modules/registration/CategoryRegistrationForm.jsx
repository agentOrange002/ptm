import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { connect } from 'react-redux';
import UILoader from '../tools/UILoader';
import { saveCategory } from '../../../redux/actions/CategoryActions';
import { CATEGORY_SAVE } from '../../../redux/constants/CategoryConstants';
import { Field, reduxForm } from 'redux-form';
import {  minLength1, maxLength150 } from '../../messages/errorFieldNotification';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from "primereact/messages";
import { Dropdown } from 'primereact/dropdown';

const CategoryType = [	
    { label: 'WEEKLY', value: 'WEEKLY' },
    { label: 'MONTHLY', value: 'MONTHLY' },   
];

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" },
	divPaddingTop:{ paddingTop: "30px" },
}

class CategoryRegistrationForm extends Component {

	state = {
        category: null,
    };

	onSubmit = formValues => {
		this.props.saveCategory(formValues);
	};

    renderDropdown = ({ input, label, data, valueField, textField}) => {
        return (
            <div className='p-col-6 p-md-12' style={MyStyle.top}>
                <Dropdown
                    {...input}	
                    optionLabel={textField}					
                    tooltip={label}
                    tooltipOptions={MyStyle.ttop}
                    style={MyStyle.twidth}
                    value={valueField}
                    options={data}
                    onChange={(e) => {
                       this.onChangeCategory(e.value)
                       // input.onChange(input.value);
                    }}
                    onBlur={(e) => {						
                        input.onBlur(valueField);						
                    }}    
					showClear                
					/>
            </div>
        );
    }

	onChangeCategory = value => {
		this.setState({category:value});
	}

	renderInput = ({ input, label, meta: { touched, error, warning } }) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.divPaddingTop}>
				<span className='p-float-label'>
					<InputText
						{...input}
						className={error ? `p-invalid` : undefined}
						id={label}
						style={MyStyle.twidth}
						tooltip={label}
						tooltipOptions={MyStyle.ttop}
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
								<small className="p-error">{error}</small>
							</span>
						)))}
			</div>
		);
	}

	renderTextArea = ({ input, label, meta: { touched, error, warning } }) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.top}>
				<span className='p-float-label'>
					<InputTextarea
						{...input}
						className={error ? `p-invalid` : undefined}
						style={MyStyle.twidth}
						rows={5}
						cols={30}
						tooltip={label}
						tooltipOptions={MyStyle.ttop}
					/>
					<label htmlFor='in'>{label}</label>
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

	showError(message) {
        let msg = message;
        if(_.isEmpty(message))
            msg = "Error Board Registration";
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message :",
            detail: msg
        });
    }

    showSuccess() {
        this.messages.show({
            sticky: true,
            severity: "success",
            summary: "Success Message :",
            detail: "Successfully Add New Category"
        });		
    }	

	componentDidUpdate(prevProps, prevState) {
        if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
            if (this.props.ERROR) {
                this.showError(this.props.ERROR_MESSAGE.message);
            }
        }
        if (this.props.CATEGORIES !== prevProps.CATEGORIES) {
            if(this.props.FETCHTYPE === CATEGORY_SAVE)	{
				this.showSuccess();		
				this.setState({category:null})						
			}		
        }
    }

	render() {
		return (
			<UILoader blockui='CATEGORY_LOADING' unblockui={['CATEGORY_ERROR', 'CATEGORY_SAVE']}>
				<Panel header={this.props.title}>
				<Messages ref={el => (this.messages = el)}></Messages>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className='p-grid p-fluid'>
							<Field name='categoryName' label='Category Name:' component={this.renderInput} validate={minLength1} />
							<Field name="categoryType" data={CategoryType} valueField={this.state.category} textField="label" component={this.renderDropdown} />
                            <Field name='categoryDescription' label='Category Description:' component={this.renderTextArea} validate={[minLength1, maxLength150]} />
						</div>
						<div
							className='button'
							style={MyStyle.ButtonStyle}>
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

const newCategoryForm = reduxForm({
	form: 'addNewCategory',
})(CategoryRegistrationForm);

const mapStateToProps = state => {
	return {
		LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        CATEGORIES: state.CATEGORIES.categoriesResponse,
		FETCHTYPE: state.CATEGORIES.fetchType,
		ERROR: state.CATEGORIES.fetchError,
        ERROR_MESSAGE: state.CATEGORIES.fetchErrorMessage
	};
};

const mapDispatchToProps = { saveCategory };

export default connect(mapStateToProps, mapDispatchToProps)(newCategoryForm);
