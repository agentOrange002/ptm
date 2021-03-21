import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { saveMemberContact , mcClear} from '../../../redux/actions/MemberContactActions';
import { Field, reduxForm } from 'redux-form';
import { maxLength150, minLength1, number } from '../../messages/errorFieldNotification';
import { Dropdown } from 'primereact/dropdown';

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" }
}

const ContactType = [
    { label: 'EMAIL', value: 'EMAIL' },
    { label: 'MOBILE', value: 'MOBILE' },
    { label: 'LANDLINE', value: 'LANDLINE' },
];

class MemberContactDialog extends Component {

    state = {
        contactType: null
    }

    async componentDidMount() {
        await this.props.mcClear();
    }

    renderDropdown = ({ input, label, data, valueField, textField }) => {
        return (
            <div className='p-col-12 p-md-12' style={MyStyle.top}>
                <Dropdown
                    {...input}
                    optionLabel={textField}
                    tooltip={label}
                    tooltipOptions={MyStyle.ttop}
                    style={MyStyle.twidth}
                    value={valueField}
                    options={data}
                    onChange={(e) => {                      
                        //input.onChange(input.value = e.value);
                        this.onChangeType(e.value);
                    }}
                    onBlur={(e) => {
                        input.onBlur(valueField);
                    }}                   
                    showClear
                />
            </div>
        );
    }

    onChangeType = value => {
        this.setState({contactType: value});
    }

    renderTextInput = ({ input, label, meta: { touched, error, warning } }) => {
        return (
            <div className='p-col-12 p-lg-6 p-md-6' style={MyStyle.top}>
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
        await this.props.saveMemberContact(formValues,this.props.memberId);       
    }

    componentDidUpdate(prevProps) {
        if(this.props.CONTACTS !== prevProps.CONTACTS) {
            this.setState({contactType: null});
            if(this.props.FETCHTYPE === 'MEMBERCONTACT_SAVE')	{
                this.props.hidethis();   								
			}		
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Fieldset legend='Add New Contact Form'>
                        <div className='p-grid p-fluid'>
                            <Field type="text" name="type" data={ContactType} valueField={this.state.contactType} textField="label" component={this.renderDropdown} />
                            <Field type="text" name="serviceName" label="Service Name:" component={this.renderTextInput} validate={[minLength1, maxLength150]} />
                            <Field type="text" name="detail" label="Detail:" component={this.renderTextInput} validate={[minLength1, maxLength150]} />                               
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
                                    disabled={this.props.pristine || this.props.submitting}
                                    icon='pi pi-save'
                                    label='Add Contact'
                                    style={MyStyle.Button}
                                />
                            </span>
                        </div>
                </form>
            </div>
        );
    }
}

const AddMemberContactForm = reduxForm({
                    form: 'addMemberContactForm'
})(MemberContactDialog);

const mapStateToProps = state => {
	return {		      
        CONTACTS: state.MEMBERCONTACTS.membercontactsResponse,
        FETCHTYPE: state.MEMBERCONTACTS.fetchType	
	};
};

const mapDispatchToProps = { saveMemberContact,mcClear} ;

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberContactForm);