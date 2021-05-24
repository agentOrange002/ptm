import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { Messages } from 'primereact/messages';
import UILoader from '../tools/UILoader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getReleaseByReleaseId } from '../../../redux/actions/ReleaseActions';

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
	boardId: { width: '250px' },
	boardName: { width: '250px' },
	remark: { width: '750px' },
	boardStatus: { width: '150px' },
	loggedDate: { width: '300px' },
	divform: { paddingTop: '20px' },
	ShortDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	fieldDivButton: { paddingTop: '10px', paddingBottom: '35px' },
	fieldButton: { marginRight: '.25em', float: 'right', width: '250px' },
	headerDiv: { display: 'flex', justifyContent: 'space-between' },
	headerButton: { width: '250px', float: 'left' },
};

class ReleaseInfo extends Component {
	state = {
		ReleaseDialog: false,
		members: [],
	};

	componentDidMount() {
		const { releaseId } = this.props.match.params;
		this.props.getReleaseByReleaseId(releaseId);
	}

	componentDidUpdate(prevProps) {
		if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
			if (this.props.ERROR) {
				this.showError(this.props.ERROR_MESSAGE.message);
			}
		}
	}

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((board, i) => (
							<li key={board.boardId}>{board.boardId + ' - ' + board.boardName + ' - ' + board.boardStatus + ' - ' + board.loggedDate}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Board: {data.boardId + ' - ' + data.boardName + ' - ' + data.boardStatus + ' - ' + data.loggedDate}</div>;
		}
	}

	statusBody = (rowData) => {
		return <span className={`boardstatus-badge status-${rowData.boardStatus.toLowerCase()}`}>{rowData.boardStatus}</span>;
	};

	refreshTable = async (event) => {
		event.preventDefault();
		const { releaseId } = this.props.match.params;
		this.props.getReleaseByReleaseId(releaseId);
	};

	hideDialog = () => {
		this.setState({ ReleaseDialog: false });
	};

	openDialog = () => {
		this.setState({ ReleaseDialog: true });
	};

	showError(message) {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Board Registration';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :',
			detail: msg,
		});
	}

	showSuccess() {
		this.messages.show({
			severity: 'success',
			summary: 'Success Message :',
			detail: 'Successfully Add Recruited Members!',
		});
	}

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<UILoader blockui='RELEASE_LOADING' unblockui={['RELEASE_GET_BY_RELEASEID', 'RELEASE_ERROR']}>
				<div className='p-grid '>
					<div className='p-col-12'>
						<Panel header={`Release ID: ${this.props.RELEASE.releaseId}`}>
							<Fieldset legend='Recruiter Profile'>
								<div className='p-fluid p-grid'>
									<div className='p-field p-col-12 p-md-6'>
										<h2>{this.props.RELEASE.releaseId}</h2>
										<br />
										<label>{this.props.RELEASE.id}</label>
										<br />
										<label>{this.props.RELEASE.loggedDate}</label>
										<br />
										<label>{this.props.RELEASE.totalAmount}</label>
									</div>
									<div className='p-field p-col-12 p-md-6'>
										<label>User ID: {this.props.RELEASE.userDetails_Release.userId}</label>
										<br />
										<label>ID: {this.props.RELEASE.userDetails_Release.id}</label>
										<br />
										<label>Logged By: {this.props.RELEASE.userDetails_Release.fullName}</label>
									</div>
								</div>
							</Fieldset>
						</Panel>
					</div>
					<div className='p-col-12'>
						<Messages ref={(el) => (this.messages = el)}></Messages>
						<DataTable
							value={this.props.RELEASE.boards}
							sortField='id'
							sortOrder={-1}
							scrollable={true}
							selectionMode='single'
							header='List of Boards'
							footer={this.displaySelection(this.state.selectedBoard)}
							selection={this.state.selectedBoard}
							onSelectionChange={(e) => this.setState({ selectedBoard: e.value })}
							paginator={true}
							paginatorLeft={paginatorLeft}
							paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
							currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
							rows={10}
							rowsPerPageOptions={[5, 10, 20]}
							contextMenuSelection={this.state.selectedBoard}
							onContextMenuSelectionChange={(e) => this.setState({ selectedBoard: e.value })}
							onContextMenu={(e) => this.cm.show(e.originalEvent)}>
							<Column field='id' header='ID' style={MyStyle.id} />
							<Column field='boardId' header='Board ID' style={MyStyle.boardId} />
							<Column field='boardName' header='Board Name' style={MyStyle.boardName} />
							<Column field='boardStatus' header='Board Status' body={this.statusBody} style={MyStyle.boardStatus} />
							<Column field='remark' header='Remark' style={MyStyle.remark} />
							<Column field='loggedDate' header='Logged Date' style={MyStyle.loggedDate} />
						</DataTable>
					</div>
				</div>
			</UILoader>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { releaseId } = ownProps.match.params;
	return {
		RELEASE: state.RELEASES.releasesResponse[releaseId],
		RELEASES: state.RELEASES.releasesResponse,
		FETCHTYPE: state.RELEASES.fetchType,
		ERROR: state.RELEASES.fetchError,
		ERROR_MESSAGE: state.RELEASES.fetchErrorMessage,
	};
};

const mapDispatchToProps = { getReleaseByReleaseId };

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseInfo);
