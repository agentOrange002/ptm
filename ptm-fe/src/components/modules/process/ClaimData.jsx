import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllClaims } from '../../../redux/actions/ClaimActions';
import UILoader from '../tools/UILoader';
import history from '../../../routes/history';
import { ContextMenu } from 'primereact/contextmenu';

const MyStyle = {
	id: { width: '150px' },
	claimId: { width: '250px' },
	boardStatus: { width: '250px' },
	boardName: { width: '750px' },
};

class ClaimData extends Component {
	state = {
		claims: null,
		selectedClaim: null,
		menu: [
			{
				label: 'View Claim',
				icon: 'pi pi-fw pi-search',
				command: (event) => this.viewClaim(this.state.selectedClaim),
			},
		],
	};

	async componentDidMount() {
		if (_.isEmpty(this.props.CLAIMS)) await this.props.getAllClaims();
	}

	viewClaim(claim) {
		let id = claim.claimId;
		history.push(`/app/process/claim/view/${id}`);
	}

	hideContext = () => {
		this.setState({ selectedClaim: null });
	};

	refreshTable = async (event) => {
		event.preventDefault();
		await this.props.getAllClaims();
	};

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((claim, i) => (
							<li key={claim.claimId}>{claim.claimId + ' - ' + claim.id + ' - ' + claim.boardClaimDetails.boardName}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Claim: {data.claimId + ' - ' + data.id + ' - ' + data.boardClaimDetails.boardName}</div>;
		}
	}

	statusBody = (rowData) => {
		return <span className={`boardstatus-badge status-${rowData.boardClaimDetails.boardStatus.toLowerCase()}`}>{rowData.boardClaimDetails.boardStatus}</span>;
	};

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<UILoader blockui='CLAIM_LOADING' unblockui={['CLAIM_GET_ALL', 'CLAIM_ERROR']}>
					<DataTable
						value={this.props.CLAIMS}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='Claim Data Table'
						footer={this.displaySelection(this.state.selectedClaim)}
						selection={this.state.selectedClaim}
						onSelectionChange={(e) => this.setState({ selectedClaim: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedClaim}
						onContextMenuSelectionChange={(e) => this.setState({ selectedClaim: e.value })}
						onContextMenu={(e) => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id} />
						<Column field='claimId' header='Claim ID' style={MyStyle.claimId} />
						<Column field='boardClaimDetails.boardStatus' header='Status' body={this.statusBody} style={MyStyle.boardStatus} />
						<Column field='boardClaimDetails.boardName' header='Board Name' style={MyStyle.boardName} />
					</DataTable>
				</UILoader>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		CLAIMS: Object.values(state.CLAIMS.claimsResponse),
	};
};

const mapDispatchToProps = { getAllClaims };

export default connect(mapStateToProps, mapDispatchToProps)(ClaimData);
