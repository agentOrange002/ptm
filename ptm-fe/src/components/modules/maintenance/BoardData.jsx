import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllBoards } from '../../../redux/actions/BoardActions';
import UILoader from '../tools/UILoader';
import history from '../../../routes/history';
import { ContextMenu } from 'primereact/contextmenu';
import { InputText } from 'primereact/inputtext';

const MyStyle = {
	id: { width: '150px' },
	boardId: { width: '250px' },
	boardName: { width: '250px' },
	remark: { width: '750px' },
	boardStatus: { width: '150px' },
	loggedDate: { width: '300px' },
};

class BoardData extends Component {
	state = {
		boards: null,
		selectedBoard: null,
		menu: [
			{
				label: 'View Board',
				icon: 'pi pi-fw pi-search',
				command: (event) => this.viewBoard(this.state.selectedBoard),
			},
		],
		globalFilter: null,
	};

	async componentDidMount() {
		if (_.isEmpty(this.props.BOARDS)) await this.props.getAllBoards();
	}

	viewBoard(board) {
		let id = board.boardId;
		history.push(`/app/boardmaintenance/view/${id}`);
	}

	hideContext = () => {
		this.setState({ selectedBoard: null });
	};

	refreshTable = async (event) => {
		event.preventDefault();
		await this.props.getAllBoards();
	};

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

	renderHeader = () => {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span className='p-input-icon-left'>
					<i className='pi pi-search' />
					<InputText style={{ width: '50vw', float: 'left' }} type='search' onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder='Search Specific Board Data' />
				</span>
			</div>
		);
	};

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<UILoader blockui='BOARD_LOADING' unblockui={['BOARD_GET_ALL', 'BOARD_ERROR']}>
					<DataTable
						value={this.props.BOARDS}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header={this.renderHeader()}
						responsive
						globalFilter={this.state.globalFilter}
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		BOARDS: Object.values(state.BOARDS.boardsResponse),
	};
};

const mapDispatchToProps = { getAllBoards };

export default connect(mapStateToProps, mapDispatchToProps)(BoardData);
