import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import _ from 'lodash';
import { Messages } from 'primereact/messages';
import UILoader from '../tools/UILoader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getRecruitmentByRecruitmentId } from '../../../redux/actions/RecruitmentActions';
import { Chips } from 'primereact/chips';

const MyStyle = {
	Panel: { paddingBottom: '1em' },
	DivButton: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '170px' },
	image: { display: 'block', marginRight: 'auto', marginLeft: 'auto', paddingBottom: '1em' },
	imageBorder: { borderStyle: 'solid', borderRadius: '150px', width: '50%', borderColor: 'black' },
	h3: { textAlign: 'center' },
	width: { width: '170px' },
	fileupload: { display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '110px', paddingBottom: '1em' },
	span: { textAlign: 'center', display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' },
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	breadcrumbBG: {
		borderStyle: 'solid',
		backgroundColor: '#edf0f5',
		color: '#edf0f5',
	},
	breadcrumb: {
		background: '#edf0f5',
		borderColor: '#edf0f5',
	},
	id: { width: '150px' },
	memberId: { width: '250px' },
	firstName: { width: '250px' },
	middleName: { width: '250px' },
	lastName: { width: '250px' },
	suffixName: { width: '150px' },
	fullName: { width: '500px' },
	gender: { width: '150px' },
	dateJoined: { width: '350px' },
	dateOut: { width: '350px' },
	memberStatus: { width: '150px' },
	loggedDate: { width: '350px' },
	userDetails_Member: { width: '500px' },
	divform: { paddingTop: '20px' },
	ShortDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	fieldDivButton: { paddingTop: '10px', paddingBottom: '35px' },
	fieldButton: { marginRight: '.25em', float: 'right', width: '250px' },
	headerDiv: { display: 'flex', justifyContent: 'space-between' },
	headerButton: { width: '250px', float: 'left' },
};

class RecruitmentInfo extends Component {
	state = {
		RecruitmentDialog: false,
		recruitmentValues: [],
	};

	componentDidMount() {
		const { recruitmentId } = this.props.match.params;
		this.props.getRecruitmentByRecruitmentId(recruitmentId);
	}

	componentDidUpdate(prevProps) {}

	addMembersRecruited = () => {
		const formValues = { memberId: this.state.memberId };
		this.setState({ RecruitmentDialog: false });
		this.setState({ memberId: '' });
	};

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

	refreshTable = async (event) => {
		event.preventDefault();
		const { recruitmentId } = this.props.match.params;
		this.props.getRecruitmentByRecruitmentId(recruitmentId);
	};

	hideDialog = () => {
		this.setState({ RecruitmentDialog: false });
	};

	openDialog = () => {
		this.setState({ RecruitmentDialog: true });
	};

	header = () => {
		return (
			<div style={MyStyle.headerDiv}>
				<Button style={MyStyle.headerButton} icon='pi pi-plus' type='button' className='p-button-success' label='Add Recruited Member' onClick={this.openDialog} />
			</div>
		);
	};

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<UILoader blockui='RECRUITMENT_LOADING' unblockui={['RECRUITMENT_GET_BY_RECRUITMENTID', 'RECRUITMENT_ERROR']}>
				<div className='p-grid '>
					<div className='p-col-12'>
						<Messages ref={(el) => (this.messages = el)}></Messages>
						<Panel header='Recruitment Information'>
							<Fieldset legend='Recruiter Profile'>
								<div className='p-fluid p-grid'>
									<div className='p-field p-col-12 p-md-6'>
										<h2>{this.props.RECRUITMENT.memberRecruitmentDetails.memberId}</h2>
										<br />
										<label>{this.props.RECRUITMENT.memberRecruitmentDetails.id}</label>
										<br />
										<label>{this.props.RECRUITMENT.memberRecruitmentDetails.fullName}</label>
									</div>
									<div className='p-field p-col-12 p-md-6'>
										<label>Status: {this.props.RECRUITMENT.memberRecruitmentDetails.memberStatus}</label>
										<br />
										<label>Date Joined: {this.props.RECRUITMENT.memberRecruitmentDetails.dateJoined}</label>
										<br />
										<label>Logged Date: {this.props.RECRUITMENT.memberRecruitmentDetails.loggedDate}</label>
									</div>
								</div>
							</Fieldset>
						</Panel>
					</div>
					<div className='p-col-12'>
						<DataTable
							value={this.props.RECRUITMENT.membersRecruited}
							sortField='id'
							sortOrder={-1}
							scrollable={true}
							selectionMode='single'
							header={this.header()}
							footer={this.displaySelection(this.state.selectedMember)}
							selection={this.state.selectedMember}
							onSelectionChange={(e) => this.setState({ selectedMember: e.value })}
							paginator={true}
							paginatorLeft={paginatorLeft}
							paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
							currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
							rows={10}
							rowsPerPageOptions={[5, 10, 20]}
							contextMenuSelection={this.state.selectedMember}
							onContextMenuSelectionChange={(e) => this.setState({ selectedMember: e.value })}
							onContextMenu={(e) => this.cm.show(e.originalEvent)}>
							<Column field='id' header='ID' style={MyStyle.id} />
							<Column field='memberId' header='Member ID' style={MyStyle.memberId} />
							<Column field='fullName' header='Full Name' style={MyStyle.fullName} />
							<Column field='memberStatus' header='Member Status' body={this.statusBody} style={MyStyle.memberStatus} />
							<Column field='firstName' header='First Name' style={MyStyle.firstName} />
							<Column field='middleName' header='Middle Name' style={MyStyle.middleName} />
							<Column field='lastName' header='Last Name' style={MyStyle.lastName} />
							<Column field='suffixName' header='Suffix Name' style={MyStyle.suffixName} />
							<Column field='gender' header='Gender' style={MyStyle.gender} />
							<Column field='dateJoined' header='Date Joined' style={MyStyle.dateJoined} />
							<Column field='loggedDate' header='Logged Date' style={MyStyle.loggedDate} />
							<Column field='dateOut' header='Date Out' style={MyStyle.dateOut} />
						</DataTable>
						<Dialog header='Recruitment Dialog' visible={this.state.RecruitmentDialog} style={MyStyle.ShortDialogStyle} modal={true} onHide={this.hideDialog}>
							<Fieldset legend='Enter Recruited Members'>
								<div className='p-grid p-fluid'>
									<div className='p-col-12 p-md-12' style={MyStyle.divform}>
										<Chips value={this.state.recruitmentValues} onChange={(e) => this.setState({ recruitmentValues: e.value })} separator=',' />
									</div>
								</div>
							</Fieldset>
							<div className='button' style={MyStyle.fieldDivButton}>
								<span>
									<Button icon='pi pi-plus' label='Add Recruited Member' style={MyStyle.fieldButton} onClick={this.addMembersRecruited} />
								</span>
							</div>
						</Dialog>
					</div>
				</div>
			</UILoader>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { recruitmentId } = ownProps.match.params;
	return {
		RECRUITMENT: state.RECRUITMENTS.recruitmentsResponse[recruitmentId],
		FETCHTYPE: state.RECRUITMENTS.fetchType,
		ERROR: state.RECRUITMENTS.fetchError,
		ERROR_MESSAGE: state.RECRUITMENTS.fetchErrorMessage,
	};
};

const mapDispatchToProps = { getRecruitmentByRecruitmentId };

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentInfo);
