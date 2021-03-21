import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllUsers } from '../../../redux/actions/UserActions';
import UILoader from '../tools/UILoader';
import { ContextMenu } from 'primereact/contextmenu';
import history from "../../../routes/history";
import { Dialog } from 'primereact/dialog';
import ApplyUserRoleDialog from './ApplyUserRoleDialog';

const MyStyle = {
	id: { width: '150px' },
    userId: { width: '250px' },
	firstName: { width: '250px'},
	middleName: { width: '250px'},
	lastName: { width: '250px' },
	suffixName: { width: '150px' },
	fullName: { width: '500px' },
    email: { width: '250px' },	
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
};

class UserData extends Component {

	state = { 
        users: null,
        selectedUser: null,
		menu: [
            {
                label: 'View User', 
                icon: 'pi pi-fw pi-search', 
                command: (event) => this.viewUser(this.state.selectedUser)
            },
			{
                label: 'Apply Role', 
                icon: 'pi pi-fw pi-plus-circle', 
                command: (event) => this.openApplyRoleDialog(this.state.selectedUser)
            }           
        ],
		user: null,
		ARDialog: false,
    };

	viewUser(user) {
        let id = user.userId;
        history.push(`/app/administration/user/${id}`);
    }

	openApplyRoleDialog(user) {
        let id = user.userId;
		this.setState({user: user});
		this.setState({ARDialog:true});
    }

	hideDialog = () => {
		this.setState({ ARDialog: false });
	};


	hideContext = () => {
        this.setState({ selectedUser: null });
    }

    async componentDidMount() {
		if(_.isEmpty(this.props.USERS))
        await this.props.getAllUsers();
    }

    refreshTable = async (event) => {
        event.preventDefault(); 
        await this.props.getAllUsers();
    }
    
	statusBody = (rowData) => {
        return <span className={`userstatus-badge status-${rowData.userStatus.toLowerCase()}`}>{rowData.userStatus}</span>;
    }

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((user, i) => (
							<li key={user.userId}>{user.userId + ' - ' + user.fullName + ' - ' + user.email }</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Member: {data.userId + ' - ' + data.fullName + ' - ' + data.email}</div>;
		}
	}

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div>
				<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <UILoader blockui="USER_LOADING" unblockui={["USER_GET_ALL","USER_ERROR","USER_APPLY_ROLE"]}>
					<DataTable
						value={this.props.USERS}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='User Data Table'
						footer={this.displaySelection(this.state.selectedUser)}
						selection={this.state.selectedUser}
						onSelectionChange={e => this.setState({ selectedUser: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedUser} 
                        onContextMenuSelectionChange={e => this.setState({ selectedUser: e.value })}
                        onContextMenu={e => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id}/>
						<Column field='userId' header='User ID' style={MyStyle.userId}/>
						<Column field='fullName' header='Full Name' style={MyStyle.fullName}/>
						<Column field='email' header='Email' style={MyStyle.email}/>
						<Column field='firstName' header='First Name' style={MyStyle.firstName}/>
						<Column field='middleName' header='Middle Name' style={MyStyle.middleName}/>
						<Column field='lastName' header='Last Name' style={MyStyle.lastName}/>
						<Column field='suffixName' header='Suffix Name' style={MyStyle.suffixName}/>
					</DataTable>
                </UILoader>
				<Dialog id='applyrole' header='Apply UserRole' visible={this.state.ARDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideDialog}>
					<ApplyUserRoleDialog hidethis={this.hideDialog} selected={this.state.user} />
				</Dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		USERS: Object.values(state.USERS.usersResponse),
	};
};

const mapDispatchToProps = { getAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
