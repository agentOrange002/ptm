import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllRecruitments } from '../../../redux/actions/RecruitmentActions';
import UILoader from '../tools/UILoader';
import history from '../../../routes/history';
import { ContextMenu } from 'primereact/contextmenu';

const MyStyle = {
	id: { width: '150px' },
	recruitmentId: { width: '250px' },
	recruiter: { width: '750px' },
};

class RecruitmentData extends Component {
	state = {
		recruitments: null,
		selectedRecruitment: null,
		menu: [
			{
				label: 'View Recruitment',
				icon: 'pi pi-fw pi-search',
				command: (event) => this.viewRecruitment(this.state.selectedRecruitment),
			},
		],
	};

	async componentDidMount() {
		if (_.isEmpty(this.props.RECRUITMENTS)) await this.props.getAllRecruitments();
	}

	viewRecruitment(recruitment) {
		let id = recruitment.recruitmentId;
		history.push(`/app/process/recruitment/view/${id}`);
	}

	hideContext = () => {
		this.setState({ selectedRecruitment: null });
	};

	refreshTable = async (event) => {
		event.preventDefault();
		await this.props.getAllRecruitments();
	};

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((recruitment, i) => (
							<li key={recruitment.recruitmentId}>{recruitment.recruitmentId + ' - ' + recruitment.id + ' - ' + recruitment.memberRecruitmentDetails.fullName}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Recruitment: {data.recruitmentId + ' - ' + data.recruitmentName + ' - ' + data.recruitmentStatus + ' - ' + data.loggedDate}</div>;
		}
	}

	statusBody = (rowData) => {
		return <span className={`recruitmentstatus-badge status-${rowData.recruitmentStatus.toLowerCase()}`}>{rowData.recruitmentStatus}</span>;
	};

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<UILoader blockui='RECRUITMENT_LOADING' unblockui={['RECRUITMENT_GET_ALL', 'RECRUITMENT_ERROR']}>
					<DataTable
						value={this.props.RECRUITMENTS}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='Recruitment Data Table'
						footer={this.displaySelection(this.state.selectedRecruitment)}
						selection={this.state.selectedRecruitment}
						onSelectionChange={(e) => this.setState({ selectedRecruitment: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedRecruitment}
						onContextMenuSelectionChange={(e) => this.setState({ selectedRecruitment: e.value })}
						onContextMenu={(e) => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id} />
						<Column field='recruitmentId' header='Recruitment ID' style={MyStyle.recruitmentId} />
						<Column field='memberRecruitmentDetails.fullName' header='Recruiter' style={MyStyle.recruiter} />
					</DataTable>
				</UILoader>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		RECRUITMENTS: Object.values(state.RECRUITMENTS.recruitmentsResponse),
	};
};

const mapDispatchToProps = { getAllRecruitments };

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentData);
