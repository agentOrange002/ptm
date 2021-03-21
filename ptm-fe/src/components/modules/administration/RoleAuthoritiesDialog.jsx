import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { Fieldset } from 'primereact/fieldset';
import { connect } from 'react-redux';
import { saveRole, applyRoleAuth ,roleClear } from '../../../redux/actions/RoleActions';
import { getAllAuthorities} from '../../../redux/actions/AuthorityActions';
import _ from 'lodash';

const MyStyle = {
    ButtonStyle: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '250px' },
    top: { paddingTop: "20px" },
    ttop: { position: 'top' },
    twidth: { width: "100%" }
}

class RoleAuthoritiesDialog extends Component {
   
    state = {
        source:[],
        target:[]
    }
    
    async componentDidMount () {       
        this.props.roleClear();       
        await this.props.getAllAuthorities();             
        this.setState({source:this.props.AUTHORITIES});        
    }
   

    onSubmit = async (formValues) => {      
        await this.props.saveRole(formValues);            
    }  

    componentDidUpdate(prevProps) {
        if (this.props.ROLES !== prevProps.ROLES) {
            if(this.props.FETCHTYPE === 'ROLE_APPLY_AUTHORITIES')	{
                this.props.hidethis();   								
			}		
        }
    }

    itemTemplate = (item) => {
        return (                      
               <h5 className="p-mb-2">{item.name}</h5>
        );
    }

    onChange = (event) => {
        this.setState({source:event.source});
        this.setState({target:event.target});
    }

    applyAuth = async event => {
        event.preventDefault();
      
      await this.props.applyRoleAuth(this.props.selected.name,this.state.target);
    }

    render() {
        
        return (
            <div>              
                    <Fieldset legend={'Applying Role Authorities Form:'+this.props.selected.name}>    
                        <div className="card">
                            <PickList source={this.state.source} target={this.state.target} itemTemplate={this.itemTemplate}
                                sourceHeader="Available" targetHeader="Selected"
                                sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                                onChange={this.onChange}></PickList>
                        </div>
                    </Fieldset>
                        <div className='button'
                            style={MyStyle.ButtonStyle}>
                            <span>
                                <Button
                                    disabled={this.props.pristine || this.props.submitting}
                                    icon='pi pi-save'
                                    label='Apply Role Authorities'
                                    style={MyStyle.Button}
                                    onClick={this.applyAuth}
                                />
                            </span>
                        </div>
               
            </div>
        );
    }
}



const mapStateToProps = state => {
	return {		      
        ROLES: Object.values(state.ROLES.rolesResponse),	
        FETCHTYPE: state.ROLES.fetchType,
        AUTHORITIES: Object.values(state.AUTHORITIES.authoritiesResponse),
	};
};

const mapDispatchToProps = { saveRole, getAllAuthorities , applyRoleAuth, roleClear} ;

export default connect(mapStateToProps, mapDispatchToProps)(RoleAuthoritiesDialog);