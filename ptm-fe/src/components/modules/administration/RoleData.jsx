import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllRoles } from '../../../redux/actions/RoleActions';
import UILoader from '../tools/UILoader';
import { ContextMenu } from 'primereact/contextmenu';
import { Dialog } from 'primereact/dialog';
import AddRoleDialog from './AddRoleDialog';
import RoleAuthoritiesDialog from './RoleAuthoritiesDialog';
import { Messages } from 'primereact/messages';
import { ROLE_SAVE, ROLE_APPLY_AUTHORITIES } from '../../../redux/constants/RoleConstants';

const MyStyle = {
	id: { width: '450px' },
	roleName: { width: '550px' },
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	ARADialogStyle: { width: '70vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
};

class RoleData extends Component {
	state = {
		roles: null,
		selectedRole: null,
		roleDialog: false,
		araDialog: false,
		menu: [
			{
				label: 'View Role',
				icon: 'pi pi-fw pi-search-plus',
				command: (event) => this.viewRole(this.state.selectedRole),
			},
			{
				label: 'Apply Role Authorities',
				icon: 'pi pi-fw pi-check-circle',
				command: (event) => this.displayARADialog(this.state.selectedRole),
			},
		],
		selectItem: {},
	};

	viewRole(role) {
		let id = role.roleId;
		//history.push(`/app/administration/view/role/${id}`);
	}

	hideRoleDialog = () => {
		this.setState({ roleDialog: false });
	};

	hideARADialog = () => {
		this.setState({ araDialog: false });
	};

	hideContext = () => {
		this.setState({ selectedRole: null });
	};

	async componentDidMount() {
		await this.props.getAllRoles();
	}

	refreshTable = async (event) => {
		event.preventDefault();
		await this.props.getAllRoles();
	};

	displayAddRoleDialog = (event) => {
		event.preventDefault();
		this.setState({ roleDialog: true });
	};

	displayARADialog = (value) => {
		this.setState({ araDialog: true });
		this.setState({ selectItem: value });		
	};

	header = () => {
		return (
			<div className='p-d-flex export-buttons' style={{ width: '180px' }}>
				<Button type='button' icon='pi pi-plus-circle' onClick={this.displayAddRoleDialog} className='p-button-success p-mr-2' label='Add New Role' />
				{/* <Button type='button' icon='pi pi-file-pdf'className='p-button-warning p-mr-2' data-pr-tooltip='PDF' /> */}
				{/* <Button type='button' icon='pi pi-filter'  className='p-button-info p-ml-auto' data-pr-tooltip='Selection Only' /> */}
			</div>
		);
	};

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((role, i) => (
							<li key={role.id}>{role.id + ' - ' + role.name}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Role: {data.id + ' - ' + data.name}</div>;
		}
	}

	showError(type,message) {
        let msg = message;
        if(_.isEmpty(message))
            msg = "Error Found";
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message :"+type,
            detail: msg
        });
    }

	showSuccess(type,message) {
        this.messages.show({           
            severity: "success",
            summary: "Success Message :"+type,
            detail: message
        });		
	
    }	

	componentDidUpdate(prevProps) {
        if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
            if (this.props.ERROR) {
                this.showError(this.props.FETCHTYPE,this.props.ERROR_MESSAGE.message);
            }
        }
		if(this.props.ROLES !== prevProps.ROLES){
			if(this.props.FETCHTYPE === ROLE_SAVE )	{
				this.showSuccess(this.props.FETCHTYPE,'Successfully Create Role!');							
			}
			if(this.props.FETCHTYPE === ROLE_APPLY_AUTHORITIES)	{
				this.showSuccess(this.props.FETCHTYPE,'Successfully Apply Role Authorities!');							
			}
		}
    }

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div className='content-section implementation'>
				<Messages ref={(el) => (this.messages = el)}></Messages>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<UILoader blockui='ROLE_LOADING' unblockui={['ROLE_GET_ALL', 'ROLE_ERROR', 'ROLE_SAVE', 'ROLE_APPLY_AUTHORITIES']}>
					<DataTable
						value={this.props.ROLES}
						sortField='id'
						sortOrder={-1}
						//scrollable={true}
						selectionMode='single'
						header={this.header()}
						footer={this.displaySelection(this.state.selectedRole)}
						selection={this.state.selectedRole}
						onSelectionChange={(e) => this.setState({ selectedRole: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedRole}
						onContextMenuSelectionChange={(e) => this.setState({ selectedRole: e.value })}
						onContextMenu={(e) => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID:' style={MyStyle.id} />
						<Column field='name' header='Role Name' style={MyStyle.roleName} />
					</DataTable>
				</UILoader>
				<Dialog id='addrole' header='Add New Role' visible={this.state.roleDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideRoleDialog}>
					<AddRoleDialog hidethis={this.hideRoleDialog} />
				</Dialog>
				<Dialog id='applyroleauth' header='Applying Role Authorities' visible={this.state.araDialog} style={MyStyle.ARADialogStyle} modal={true} onHide={this.hideARADialog}>
					<RoleAuthoritiesDialog hidethis={this.hideARADialog} selected={this.state.selectItem} />
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ROLES: Object.values(state.ROLES.rolesResponse),
		ERROR: state.ROLES.fetchError,
        ERROR_MESSAGE: state.ROLES.fetchErrorMessage,
		FETCHTYPE: state.ROLES.fetchType,
	};
};

const mapDispatchToProps = { getAllRoles };

export default connect(mapStateToProps, mapDispatchToProps)(RoleData);
