import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import UILoader from '../tools/UILoader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getReleaseByReleaseId } from '../../../redux/actions/ReleaseActions';
import { TabMenu } from 'primereact/tabmenu';
import Axios from 'axios';

const items = [
	{ label: 'Release Information', icon: 'pi pi-fw pi-info-circle' },
	{ label: 'Release Report', icon: 'pi pi-fw pi-file-pdf' },
];

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
		activeItem: {},
		activeLabel: '',
		ReleaseDialog: false,
		members: [],
		reportBlob: {},
	};

	componentDidMount() {
		const { releaseId } = this.props.match.params;
		this.props.getReleaseByReleaseId(releaseId);
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

	renderInfo = () => {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<UILoader blockui='RELEASE_LOADING' unblockui={['RELEASE_GET_BY_RELEASEID', 'RELEASE_ERROR']}>
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

				<DataTable
					style={MyStyle.DivButton}
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
			</UILoader>
		);
	};

	renderReport = () => {
		return <iframe title='Release Info Report' id='boardinforeport' type='application/pdf' src={_.isEmpty(this.state.reportBlob) ? null : this.state.reportBlob} height='700px' width='100%' loading='lazy' />;
	};

	getPDF = async (boardId) => {
		await Axios.get(`${process.env.BACK_END_URL}/reports/release/${releaseId}`, {
			responseType: 'blob',
			headers: {
				Accept: 'application/pdf',
				Authorization: this.props.TOKEN,
			},
		})
			.then((response) => {
				const file = new Blob([response.data], { type: 'application/pdf', title: 'ReleaseInfoReport' });
				const fileURL = URL.createObjectURL(file);
				this.setState({ reportBlob: fileURL });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12'>
					<TabMenu
						model={items}
						activeItem={this.state.activeItem}
						onTabChange={(e) => {
							this.setState({ activeItem: e.value });
							this.setState({ activeLabel: e.value.label });
						}}
					/>
					{(() => {
						switch (this.state.activeLabel) {
							case 'Release Report':
								return this.renderReport();
							default:
								return this.renderInfo();
						}
					})()}
				</div>
			</div>
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
