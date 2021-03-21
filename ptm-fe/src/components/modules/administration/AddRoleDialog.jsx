import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { saveRole } from '../../../redux/actions/RoleActions';
import { Field, reduxForm } from 'redux-form';
import { maxLength150, minLength5} from '../../messages/errorFieldNotification';

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" }
}

class AddRoleDialog extends Component {
   
 
    renderTextInput = ({ input, label, meta: { touched, error, warning } }) => {
        return (
            <div className='p-col-12 p-lg-12 p-md-12' style={MyStyle.top}>
                <span className="p-float-label">
                    <InputText id="textinput"
                        {...input}
                        className={error ? `p-invalid` : undefined}
                        style={MyStyle.twidth}
                        tooltip={label}
                        tooltipOptions={MyStyle.ttop}
                    />
                    <label htmlFor="textinput">{label}</label>
                </span>
                {touched && ((error &&
                    <span>
                        {/* <div className="isa_error">
                            <i className="pi pi-times"></i>
                            {error}
                        </div> */}
                        <small className="p-error">{error}</small>
                    </span>
                ) || (warning &&
                    <span>
                        {/* <div className="isa_warning">
                            <i className="pi pi-question"></i>
                            {warning}
                        </div> */}
                        <small className="p-error">{warning}</small>
                    </span>
                    ))}
            </div>
        );
    }

    onSubmit = async (formValues) => {      
        await this.props.saveRole(formValues);            
    }  

    componentDidUpdate(prevProps) {
        if (this.props.ROLES !== prevProps.ROLES) {
            if(this.props.FETCHTYPE === 'ROLE_SAVE')	{
                this.props.hidethis();   								
			}		
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Fieldset legend='Add New Role Form'>
                        <div className='p-grid p-fluid'>
                           
                            <Field type="text" name="name" label="Role Name:" component={this.renderTextInput} validate={[minLength5, maxLength150]} />
                           
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
                                    disabled={this.props.pristine || this.props.submitting}
                                    icon='pi pi-save'
                                    label='Add Role'
                                    style={MyStyle.Button}
                                />
                            </span>
                        </div>
                </form>
            </div>
        );
    }
}

const AddRoleDialogForm = reduxForm({
                    form: 'addNewRole'
})(AddRoleDialog);

const mapStateToProps = state => {
	return {		      
        ROLES: state.ROLES.rolesResponse,	
        FETCHTYPE: state.ROLES.fetchType
	};
};

const mapDispatchToProps = { saveRole } ;

export default connect(mapStateToProps, mapDispatchToProps)(AddRoleDialogForm);