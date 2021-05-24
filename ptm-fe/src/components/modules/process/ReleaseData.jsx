import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllReleases } from '../../../redux/actions/ReleaseActions';
import UILoader from '../tools/UILoader';
import history from '../../../routes/history';
import { ContextMenu } from 'primereact/contextmenu';

const MyStyle = {
	id: { width: '150px' },
	releaseId: { width: '250px' },
	loggedDate: { width: '250px' },
	totalAmount: { width: '250px' },
	releaseBy: { width: '750px' },
};

class ReleaseData extends Component {
	state = {
		releases: null,
		selectedRelease: null,
		menu: [
			{
				label: 'View Release',
				icon: 'pi pi-fw pi-search',
				command: (event) => this.viewRelease(this.state.selectedRelease),
			},
		],
	};

	async componentDidMount() {
		if (_.isEmpty(this.props.RELEASES)) await this.props.getAllReleases();
	}

	viewRelease(release) {
		let id = release.releaseId;
		history.push(`/app/process/release/view/${id}`);
	}

	hideContext = () => {
		this.setState({ selectedRelease: null });
	};

	refreshTable = async (event) => {
		event.preventDefault();
		await this.props.getAllReleases();
	};

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((release, i) => (
							<li key={release.releaseId}>{release.releaseId + ' - ' + release.loggedDate + ' - ' + release.totalAmount + ' - ' + release.userDetails_Release.fullName}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Release: {data.releaseId + ' - ' + data.loggedDate + ' - ' + data.totalAmount + ' - ' + data.userDetails_Release.fullName}</div>;
		}
	}

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<UILoader blockui='RELEASE_LOADING' unblockui={['RELEASE_GET_ALL', 'RELEASE_ERROR']}>
					<DataTable
						value={this.props.RELEASES}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='Release Data Table'
						footer={this.displaySelection(this.state.selectedRelease)}
						selection={this.state.selectedRelease}
						onSelectionChange={(e) => this.setState({ selectedRelease: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedRelease}
						onContextMenuSelectionChange={(e) => this.setState({ selectedRelease: e.value })}
						onContextMenu={(e) => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id} />
						<Column field='releaseId' header='Release ID' style={MyStyle.releaseId} />
						<Column field='loggedDate' header='Logged Date' style={MyStyle.loggedDate} />
						<Column field='totalAmount' header='Amount Release' style={MyStyle.totalAmount} />
						<Column field='userDetails_Release.fullName' header='Release By' style={MyStyle.releaseBy} />
					</DataTable>
				</UILoader>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		RELEASES: Object.values(state.RELEASES.releasesResponse),
	};
};

const mapDispatchToProps = { getAllReleases };

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseData);
