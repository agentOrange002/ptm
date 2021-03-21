import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllMembers } from '../../../redux/actions/MemberActions';
import UILoader from '../tools/UILoader';
import { ContextMenu } from 'primereact/contextmenu';
import history from "../../../routes/history";

const MyStyle = {
	id: { width: '150px' },
	memberId: { width: '250px' },
	firstName: { width: '250px'},
	middleName: { width: '250px'},
	lastName: { width: '250px' },
	suffixName: { width: '150px' },
	fullName: { width: '500px' },
	gender: { width: '150px' },
	dateJoined: { width: '350px' },
	dateOut: { width: '350px' },
	memberStatus: { width: '150px' },
	loggedDate: { width: '350px' },
	userDetails_Member: { width: '500px' },
};

class MemberData extends Component {

	state = { 
        members: null,
        selectedMember: null,
		menu: [
            {
                label: 'View Member', 
                icon: 'pi pi-fw pi-ticket', 
                command: (event) => this.viewMember(this.state.selectedMember)
            }            
        ]
    };

	viewMember(member) {
        let id = member.memberId;
        history.push(`/app/membermaintenance/view/${id}`);
    }

	hideContext = () => {
        this.setState({ selectedMember: null });
    }

    async componentDidMount() {
		if(_.isEmpty(this.props.MEMBERS))
        await this.props.getAllMembers();
    }

    refreshTable = async (event) => {
        event.preventDefault(); 
        await this.props.getAllMembers();
    }
    
	statusBody = (rowData) => {
        return <span className={`memberstatus-badge status-${rowData.memberStatus.toLowerCase()}`}>{rowData.memberStatus}</span>;
    }

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((member, i) => (
							<li key={member.memberId}>{member.memberId + ' - ' + member.fullName + ' - ' + member.memberStatus + ' - ' + member.dateJoined}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Member: {data.memberId + ' - ' + data.fullName + ' - ' + data.memberStatus + ' - ' + data.dateJoined}</div>;
		}
	}

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div>
				<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <UILoader blockui="MEMBER_LOADING" unblockui={["MEMBER_GET_ALL","MEMBER_ERROR"]}>
					<DataTable
						value={this.props.MEMBERS}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='Member Data Table'
						footer={this.displaySelection(this.state.selectedMember)}
						selection={this.state.selectedMember}
						onSelectionChange={e => this.setState({ selectedMember: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedMember} 
                        onContextMenuSelectionChange={e => this.setState({ selectedMember: e.value })}
                        onContextMenu={e => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id}/>
						<Column field='memberId' header='Member ID' style={MyStyle.memberId}/>
						<Column field='fullName' header='Full Name' style={MyStyle.fullName}/>
						<Column field='memberStatus' header='Member Status' body={this.statusBody} style={MyStyle.memberStatus}/>
						<Column field='firstName' header='First Name' style={MyStyle.firstName}/>
						<Column field='middleName' header='Middle Name' style={MyStyle.middleName}/>
						<Column field='lastName' header='Last Name' style={MyStyle.lastName}/>
						<Column field='suffixName' header='Suffix Name' style={MyStyle.suffixName}/>					
						<Column field='gender' header='Gender' style={MyStyle.gender}/>
						<Column field='dateJoined' header='Date Joined' style={MyStyle.dateJoined}/>											
						<Column field='loggedDate' header='Logged Date' style={MyStyle.loggedDate}/>	
						<Column field='dateOut' header='Date Out' style={MyStyle.dateOut}/>						
					</DataTable>
                </UILoader>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		MEMBERS: Object.values(state.MEMBERS.membersResponse),
	};
};

const mapDispatchToProps = { getAllMembers };

export default connect(mapStateToProps, mapDispatchToProps)(MemberData);
