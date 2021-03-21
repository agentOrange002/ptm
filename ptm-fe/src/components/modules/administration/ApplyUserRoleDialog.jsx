import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { applyUserRole} from '../../../redux/actions/UserActions';
import { getAllRoles } from '../../../redux/actions/RoleActions';
import { Field, reduxForm } from 'redux-form';

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '150px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" }
}

class ApplyUserRoleDialog extends Component {

    state={
        role:null
    }   

    async componentDidMount() {
    await this.props.getAllRoles();
    }
 
    renderDropdown = ({input, data,valueField, textField}) => {
		return (
			<div className='p-col-12 p-md-12' style={MyStyle.render}>						
					<Dropdown    
						{...input}      
						value={valueField}       
						options={data}         
                        optionLabel={textField}
                        filter						
						filterBy={textField}
						onChange={this.onChangeRole}							
						onBlur={(e) => { 							
							if(!_.isEmpty(valueField)){
								input.onBlur(valueField.name);
							}							
							}}	
						placeholder="Select a Role"			
						valueTemplate={this.selectedTemplate}	
						itemTemplate={this.optionTemplate}	
						 />						
			</div>
		);
    }

    selectedTemplate = (option, props) => {
        if (option) {
            return (
				<div style={MyStyle.divStyle}> 
                    <div>{option.name}</div>
				</div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

	optionTemplate = (option) => {
        return (
			<div style={MyStyle.divStyle}> 
                <div>{option.name}</div>
			</div>
        );
    }

    onChangeRole = event => {
		if(!_.isEmpty(event.value))
		this.setState({role:event.value});		
	}

    onSubmit = async (formValues) => {      
        await this.props.applyUserRole(formValues,this.props.selected.userId);            
    }  

    componentDidUpdate(prevProps) {
        if (this.props.USERS !== prevProps.USERS) {
            if(this.props.FETCHTYPE === 'USER_APPLY_ROLE')	{
                this.props.hidethis();   								
			}		
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Fieldset legend={'Apply Role Form:'+this.props.selected.userId}>
                        <div className='p-grid p-fluid'>
                           
                        <Field 
								name='name' 								
								component={this.renderDropdown}
								data={this.props.ROLES}
								valueField={this.state.role}
								textField='name'
								/>
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
                                    disabled={this.props.pristine || this.props.submitting}
                                    icon='pi pi-save'
                                    label='Apply Role'
                                    style={MyStyle.Button}
                                />
                            </span>
                        </div>
                </form>
            </div>
        );
    }
}

const ApplyUserRoleForm= reduxForm({
                    form: 'applyUserRoleForm'
})(ApplyUserRoleDialog);

const mapStateToProps = state => {
	return {		      
        USERS: state.USERS.usersResponse,	
        ROLES: Object.values(state.ROLES.rolesResponse),
        FETCHTYPE: state.USERS.fetchType
	};
};

const mapDispatchToProps = { applyUserRole,getAllRoles } ;

export default connect(mapStateToProps, mapDispatchToProps)(ApplyUserRoleForm);