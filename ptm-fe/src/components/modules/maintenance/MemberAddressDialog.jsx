import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { saveMemberAddress, memberAddressClear } from '../../../redux/actions/MemberAddressActions';
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

const AddressType = [   
    { label: 'CURRENT', value: 'CURRENT' },
    { label: 'HOME', value: 'HOME' },  
    { label: 'PERMANENT', value: 'PERMANENT' },
    { label: 'RESIDENCE', value: 'RESIDENCE' },
];

class MemberAddressDialog extends Component {

    state = {
        addressType: null
    }

    async componentDidMount(){
        await this.props.memberAddressClear();
    }

    renderDropdown = ({ input, label, data, valueField, textField }) => {
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
                        //this.value = e.value;
                        //input.onChange(e.value);
                        this.onChangeType(e.value);
                    }}
                    onBlur={(e) => {
                        //input.onBlur(input.value);
                        input.onBlur(valueField);
                    }}                    
                    showClear
                />
            </div>
        );
    }

    onChangeType = value => {
		this.setState({addressType:value});
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
        await this.props.saveMemberAddress(formValues,this.props.memberId);
        //await this.props.hidethis();        
    }

    componentDidUpdate(prevProps) {
        if(this.props.ADDRESSES !== prevProps.ADDRESSES) {
            this.setState({addressType:null});
            if(this.props.FETCHTYPE === 'MEMBERADDRESS_SAVE')	{
                this.props.hidethis();   								
			}		
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Fieldset legend='Add New Address Form'>
                        <div className='p-grid p-fluid'>
                            <Field type="text" name="city" label="City:" component={this.renderTextInput} validate={[minLength1, maxLength150]} />
                            <Field type="text" name="country" label="Country:" component={this.renderTextInput} validate={[minLength1, maxLength150]} />
                            <Field type="text" name="streetName" label="Street Name:" component={this.renderTextInput} validate={[minLength1, maxLength150]} />
                            <Field type="text" name="postalCode" label="Postal Code:" component={this.renderTextInput} validate={number} />
                            <Field type="text" name="type" data={AddressType} valueField={this.state.addressType} textField="label" component={this.renderDropdown} />
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
                                    disabled={this.props.pristine || this.props.submitting}
                                    icon='pi pi-save'
                                    label='Add Address'
                                    style={MyStyle.Button}
                                />
                            </span>
                        </div>
                </form>
            </div>
        );
    }
}

const AddMemberAddressForm = reduxForm({
                    form: 'addMemberAddressForm'
})(MemberAddressDialog);

const mapStateToProps = state => {
	return {		      
        ADDRESSES: state.MEMBERADDRESSES.memberaddressesResponse,	
        FETCHTYPE: state.MEMBERADDRESSES.fetchType
	};
};

const mapDispatchToProps = { saveMemberAddress, memberAddressClear } ;

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberAddressForm);