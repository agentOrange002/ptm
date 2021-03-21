import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { saveAddress } from '../../../redux/actions/AddressActions';
import { Field, reduxForm } from 'redux-form';
import { maxLength150, minLength10, number } from '../../messages/errorFieldNotification';
import { LoginProfile } from '../../../redux/actions/LoginActions';
import { Dropdown } from 'primereact/dropdown';

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" }
}

const AddressType = [
    { label: 'RESIDENCE', value: 'RESIDENCE' },
    { label: 'HOME', value: 'HOME' },
    { label: 'CURRENT', value: 'CURRENT' },
];

// POST http://localhost:8080/itsystem/api/addresses/d3jPjh8XVfqBAjEVuY1Kxgv8Aahkph

// "city":"La Carlota",
// "country":"Philippines",
// "streetName":"El Alamo St",
// "postalCode":"6130",		
// "type":"RESIDENCE"


class AddAddressDialog extends Component {
    state = {
        addressType: ''
    }

    renderDropdown = ({ input, label, data, textField}) => {
        return (
            <div className='p-col-6 p-md-12' style={MyStyle.top}>
                <Dropdown
                    {...input}
                    optionLabel={textField}
                    tooltip={label}
                    tooltipOptions={MyStyle.ttop}
                    style={MyStyle.twidth}
                    value={this.value}
                    options={data}
                    onChange={(e) => {
                        this.value = e.value;
                        input.onChange(input.value = e.value);
                    }}
                    onBlur={() => {
                        input.onBlur(input.value);
                    }}
                    placeholder="Select Address Type"
                />
            </div>
        );
    }

    renderTextInput = ({ input, label, meta: { touched, error, warning } }) => {
        return (
            <div className='p-col-12 p-lg-6 p-md-6' style={MyStyle.top}>
                <span className="p-float-label">
                    <InputText id="textinput"
                        {...input}
                        style={MyStyle.twidth}
                        tooltip={label}
                        tooltipOptions={MyStyle.ttop}
                    />
                    <label htmlFor="textinput">{label}</label>
                </span>
                {touched && ((error &&
                    <span>
                        <div className="isa_error">
                            <i className="pi pi-times"></i>
                            {error}
                        </div>
                    </span>
                ) || (warning &&
                    <span>
                        <div className="isa_warning">
                            <i className="pi pi-question"></i>
                            {warning}
                        </div>
                    </span>
                    ))}
            </div>
        );
    }

    onSubmit = async (formValues) => {      
        await this.props.saveAddress(formValues);
        await this.props.hidethis();
        this.props.LoginProfile();
    }

    componentDidUpdate(prevProps) {
        if(this.props.ADDRESSES !== prevProps.ADDRESSES){
            this.setState({addressType:''});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Fieldset legend='Add New Address Form'>
                        <div className='p-grid p-fluid'>
                            <Field type="text" name="city" label="City:" component={this.renderTextInput} validate={[minLength10, maxLength150]} />
                            <Field type="text" name="country" label="Country:" component={this.renderTextInput} validate={[minLength10, maxLength150]} />
                            <Field type="text" name="streetName" label="Street Name:" component={this.renderTextInput} validate={[minLength10, maxLength150]} />
                            <Field type="text" name="postalCode" label="Postal Code:" component={this.renderTextInput} validate={number} />
                            <Field type="text" name="type" data={AddressType} valueField="value" textField="label" component={this.renderDropdown} />
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
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

const AddAddressForm = reduxForm({
                    form: 'addAddressForm'
})(AddAddressDialog);

const mapStateToProps = state => {
	return {		
        ADDRESSES: state.ADDRESSES.addressesResponse,		
	};
};

const mapDispatchToProps = { LoginProfile, saveAddress } ;

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressForm);