import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { DataTable } from 'primereact/datatable';
import { ContextMenu } from 'primereact/contextmenu';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
//import { Field, reduxForm } from 'redux-form';
import { getAllBoardMembersByBoardId, save1_auto } from '../../../redux/actions/BoardMemberActions';
import BoardMemberVisual from './BoardMemberVisual';
import BoardVisual1 from './BoardVisual1';
import { TabMenu } from 'primereact/tabmenu';
import { boardPayout } from '../../../redux/actions/BoardActions';
import UILoader from '../tools/UILoader';
import { BOARD_PAYOUT } from '../../../redux/constants/BoardConstants';
import Axios from 'axios';
import { Messages } from 'primereact/messages';

const items = [
	{ label: 'Board Members Table', icon: 'pi pi-fw pi-table' },
	{ label: 'Board Chart', icon: 'pi pi-fw pi-chart-bar' },
	{ label: 'Board Report', icon: 'pi pi-fw pi-file-pdf' },
];

const MyStyle = {
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	OTIDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
	ButtonDivStyle: { paddingTop: '10px' },
	ButtonStyle: { marginRight: '.25em', float: 'right' },
	h1Style: { textAlign: 'left' },
	paddingTop: { paddingTop: '0px' },
	ShortDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },

	fieldDivButton: { paddingTop: '10px', paddingBottom: '35px' },
	fieldButton: { marginRight: '.25em', float: 'right', width: '130px' },
	divform: { paddingTop: '20px' },
	divfield: { width: '100%' },
	tooltipField: { position: 'top' },
	fieldset: { marginBottom: '10px' },
	tcolumn: {
		id: { width: '150px' },
		boardMemBerId: { width: '200px' },
		memberNumber: { width: '250px' },
		registeredDate: { width: '250px' },
		status: { width: '250px' },
		member: { width: '350px' },
		loggedBy: { width: '350px' },
	},
	datatableButton: { width: '200px' },
};

class BoardInfo extends Component {
	state = {
		activeItem: {},
		activeLabel: '',
		firstBoardMember: null,
		selectedBoardMember: null,
		BoardMemberVisible: false,
		result1: true,
		result2: true,
		dialogState: null,
		menu: [
			{
				label: 'View Board Member',
				icon: 'pi pi-search',
				command: (event) => this.viewBoardMember(this.state.selectedBoardMember),
			},
			{
				label: 'Assigned Member',
				icon: 'pi pi-plus',
				command: (event) => this.assignedMember(this.state.selectedBoardMember),
			},
		],
		reportBlob: {},
		memberId: '',
	};

	hideContext = () => {
		this.setState({ selectedBoardMember: null });
	};

	refreshTable = async (event) => {
		event.preventDefault();
		const { boardId } = this.props.match.params;
		await this.props.getAllBoardMembersByBoardId(boardId);
	};

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((boardMember, i) => (
							<li key={boardMember.boardMemberId}>{boardMember.boardMemberId + ' - ' + boardMember.id + ' - ' + boardMember.status + ' - ' + boardMember.memberNumber}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Board Member: {data.boardMemberId + ' - ' + data.id + ' - ' + data.status + ' - ' + data.memberNumber}</div>;
		}
	}

	async componentDidMount() {
		const { boardId } = this.props.match.params;
		await this.props.getAllBoardMembersByBoardId(boardId);
		this.getPDF(this.props.BOARD.boardId);
		const { BOARDMEMBERS } = this.props;

		this.checkBoardMembers();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.BOARDMEMBERS !== this.props.BOARDMEMBERS) {
			this.checkBoardMembers();
		}
		if (this.props.BOARD !== prevProps) {
			if (this.props.FETCHTYPE === BOARD_PAYOUT) this.showSuccess();
		}
		if (this.props.BOARDERRORMESSAGE !== prevProps.BOARDERRORMESSAGE) {
			if (this.props.BOARDERRORMESSAGE) {
				this.showError(this.props.BOARDERRORMESSAGE.message);
			}
		}
	}

	showError = _.memoize((message) => {
		let msg = message;
		if (_.isEmpty(message)) msg = 'Error Board Payout';
		this.messages.show({
			sticky: true,
			severity: 'error',
			summary: 'Error Message :',
			detail: msg,
		});
	});

	showSuccess = _.memoize(() => {
		this.messages.show({
			severity: 'success',
			summary: 'Success Message :',
			detail: 'Successfully Payout',
		});
	});

	checkBoardMembers = () => {
		const { BOARDMEMBERS } = this.props;
		let result = false;
		let i = 0;
		while (i < BOARDMEMBERS.length) {
			if (_.isEmpty(BOARDMEMBERS[i].member)) {
				result = true;
				break;
			}
			i++;
		}
		this.setState({ result: result });
	};

	viewBoardMember = (boardmember) => {};

	hideDialog = () => {
		this.setState({ BoardMemberVisible: false });
	};

	onSubmit = async () => {
		const formValues = {
			memberId: this.state.memberId,
		};
		const tm = this.getFirstElement(this.props.BOARDMEMBERS);
		//console.log(JSON.stringify(formValues) + ' :' + tm.boardMemberId);
		await this.props.save1_auto(formValues, tm.boardMemberId);
		this.setState({
			BoardMemberVisible: false,
		});
		this.setState({ memberId: '' });
	};

	addBoardMember = (event) => {
		event.preventDefault();
		this.setState({ BoardMemberVisible: true });
	};

	getFirstElement = (data) => {
		let result = null;
		let i = 0;
		while (i < data.length) {
			if (_.isEmpty(data[i].member)) {
				result = data[i];
				break;
			}
			i++;
		}
		return result;
	};

	header = () => {
		return (
			<div style={MyStyle.datatableButton}>
				<Button icon='pi pi-plus' type='button' className='p-button-success' label='Add Board Member' onClick={this.addBoardMember} disabled={this.props.BOARD.boardStatus === 'PAYOUT' ? true : false} />
			</div>
		);
	};

	// renderInput({ input, label, meta: { touched, error, warning } }) {
	// 	return (
	// 		<div className='p-col-12 p-md-12' style={MyStyle.divform}>
	// 			<span className='p-float-label'>
	// 				<InputText {...input} className={error ? `p-error` : undefined} id='in' style={MyStyle.divfield} tooltip={label} tooltipOptions={MyStyle.tooltipField} />
	// 				<label htmlFor='in'>{label}</label>
	// 			</span>
	// 			{touched &&
	// 				((error && (
	// 					<span>
	// 						<div className='isa_error'>
	// 							<i className='pi pi-times'></i>
	// 							{error}
	// 						</div>
	// 					</span>
	// 				)) ||
	// 					(warning && (
	// 						<span>
	// 							<div className='isa_warning'>
	// 								<i className='pi pi-question'></i>
	// 								{warning}
	// 							</div>
	// 						</span>
	// 					)))}
	// 		</div>
	// 	);
	// }

	paginatorLeft = () => {
		return <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
	};

	// leftButton = () => {

	// 	return(
	// 		<React.Fragment>
	// 			<Button label="Payout" icon="pi pi-check" className="p-button-success" disabled={this.state.result1} onClick = {this.payout} />
	// 			<i className="pi pi-bars p-toolbar-separator p-mr-2" />
	// 			<Button label="Payout2" icon="pi pi-check" className="p-button-success" disabled={this.state.result2} onClick = {this.payout2} />
	// 		</React.Fragment>
	// 	);
	// };

	renderTable = () => {
		return (
			<div className='datatable-style'>
				<ContextMenu model={this.state.menu} ref={(el) => (this.cm = el)} onHide={this.hideContext} />
				<DataTable
					value={this.props.BOARDMEMBERS}
					sortField='memberNumber'
					sortOrder={-1}
					scrollable={true}
					selectionMode='single'
					header={this.header()}
					footer={this.displaySelection(this.state.selectedBoardMember)}
					selection={this.state.selectedBoardMember}
					onSelectionChange={(e) => {
						this.setState({ selectedBoardMember: e.value });
					}}
					paginator={true}
					paginatorLeft={this.paginatorLeft()}
					paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
					currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
					rows={15}
					rowsPerPageOptions={[5, 10, 20]}
					contextMenuSelection={this.state.selectedBoardMember}
					onContextMenuSelectionChange={(e) => this.setState({ selectedBoardMember: e.value })}
					onContextMenu={(e) => this.cm.show(e.originalEvent)}>
					<Column field='memberNumber' header='Board Position' style={MyStyle.tcolumn.memberNumber} />
					<Column field='status' header='Status' body={this.statusBody} style={MyStyle.tcolumn.status} />
					<Column field='member.fullName' header='Member Name' style={MyStyle.tcolumn.member} />
					<Column field='registeredDate' header='Date Board Joined' style={MyStyle.tcolumn.registeredDate} />
					<Column field='id' header='ID' style={MyStyle.tcolumn.id} />
					<Column field='boardMemberId' header='Board Member ID' style={MyStyle.tcolumn.boardMemBerId} />
				</DataTable>
			</div>
		);
	};

	statusBody = (rowData) => {
		return <span className={`boardmemberstatus-badge status-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
	};

	renderVisual1 = () => {
		if (this.props.BOARDMEMBERS.length === 15) return <BoardVisual1 data={this.props.BOARDMEMBERS} />;
		else return <BoardMemberVisual data={this.props.BOARDMEMBERS} />;
	};

	getPDF = async (boardId) => {
		await Axios.get(`${process.env.BACK_END_URL}/reports/board/${boardId}`, {
			responseType: 'blob',
			headers: {
				Accept: 'application/pdf',
				Authorization: this.props.TOKEN,
			},
		})
			.then((response) => {
				const file = new Blob([response.data], { type: 'application/pdf', title: 'BoardInfoReport' });
				const fileURL = URL.createObjectURL(file);
				this.setState({ reportBlob: fileURL });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	renderPDF = () => {
		return (
			<div className='p-col-12 p-md-12 p-lg-12 p-col-align-center '>
				<div className='box'>
					<iframe title='Board Info Report' id='boardinforeport' type='application/pdf' src={_.isEmpty(this.state.reportBlob) ? null : this.state.reportBlob} height='700px' width='100%' loading='lazy' />
				</div>
			</div>
		);
	};

	payout = (event) => {
		event.preventDefault();
		const { boardId } = this.props.match.params;
		return this.props.boardPayout(boardId);
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12 p-md-12 p-lg-12'>
					<Panel header='Board Information' toggleable={true}>
						<Messages ref={(el) => (this.messages = el)}></Messages>
						<UILoader blockui='BOARD_LOADING' unblockui={['BOARD_ERROR', 'BOARD_PAYOUT', 'BOARD_PAYOUT_2']}>
							<Fieldset legend='Board' style={MyStyle.fieldset}>
								<div className='p-fluid p-formgrid p-grid'>
									<div className='p-field p-col-12 p-md-6 p-lg-3'>
										<label htmlFor='id'>ID:</label>
										<InputText id='id' type='text' defaultValue={this.props.BOARD.id} readOnly />
									</div>
									<div className='p-field p-col-12 p-md-6 p-lg-3'>
										<label htmlFor='boardId'>Board ID:</label>
										<InputText id='boardId' type='text' defaultValue={this.props.BOARD.boardId} readOnly />
									</div>
									<div className='p-field p-col-12 p-md-6 p-lg-3'>
										<label htmlFor='boardStatus'>Board Status:</label>
										<InputText id='boardStatus' type='text' defaultValue={this.props.BOARD.boardStatus} readOnly />
									</div>

									<div className='p-field p-col-12 p-md-6 p-lg-3'>
										<label htmlFor='loggedDate'>Date Logged:</label>
										<InputText id='loggedDate' type='text' defaultValue={_.isEmpty(this.props.BOARD.loggedDate) ? 'NONE' : this.props.BOARD.loggedDate} readOnly />
									</div>
									<div className='p-field p-col-12 p-md-12 p-lg-12'>
										<label htmlFor='boardName'>Board Name:</label>
										<InputText id='boardName' type='text' defaultValue={this.props.BOARD.boardName} readOnly />
									</div>
									<div className='p-field p-col-12 p-md-12 p-lg-12'>
										<label htmlFor='remark'>Remark</label>
										<InputTextarea rows={5} cols={30} id='remark' type='text' defaultValue={this.props.BOARD.remark} readOnly />
									</div>
								</div>
							</Fieldset>
							<div
								className='button'
								style={{
									paddingTop: '10px',
									paddingBottom: '35px',
								}}>
								<span>
									<Button
										icon='pi pi-save'
										label='PAYOUT'
										style={{
											marginRight: '.25em',
											float: 'right',
											width: '150px',
										}}
										disabled={this.state.result}
										onClick={this.payout}
									/>
								</span>
							</div>
						</UILoader>
					</Panel>
				</div>
				<div className='p-col-12' style={MyStyle.paddingTop}>
					<UILoader blockui='BOARDMEMBER_LOADING' unblockui={['BOARDMEMBER_ERROR', 'BOARDMEMBER_SAVE', 'BOARDMEMBER_SAVE1', 'BOARDMEMBER_GET_ALL_BY_BOARDID']}>
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
								case 'Board Chart':
									return this.renderVisual1();
								case 'Board Report':
									return this.renderPDF();
								default:
									return this.renderTable();
							}
						})()}

						{/* //<form onSubmit={this.props.handleSubmit(this.onSubmit)}> */}
						<Dialog header='Apply Board Member' visible={this.state.BoardMemberVisible} style={MyStyle.ShortDialogStyle} modal={true} onHide={this.hideDialog}>
							<Fieldset legend='Board Member Form'>
								<div className='p-grid p-fluid'>
									{/* <Field name='memberId' label='Member ID' component={this.renderInput} /> */}
									<div className='p-col-12 p-md-12' style={MyStyle.divform}>
										<span className='p-float-label'>
											<InputText value={this.state.memberId} id='in' style={MyStyle.divfield} tooltip='Enter Member Id' tooltipOptions={MyStyle.tooltipField} onChange={(e) => this.setState({ memberId: e.target.value })} />
											<label htmlFor='in'>Member ID:</label>
										</span>
									</div>
								</div>
							</Fieldset>
							<div className='button' style={MyStyle.fieldDivButton}>
								<span>
									{/* disabled={this.props.pristine || this.props.submitting}  */}
									<Button icon='pi pi-plus' label='Add' style={MyStyle.fieldButton} onClick={this.onSubmit} />
								</span>
							</div>
						</Dialog>
						{/* //</form> */}
					</UILoader>
				</div>
			</div>
		);
	}
}

// const BoardMemberForm = reduxForm({
// 	form: 'addNewBoardMember_Save1',
// })(BoardInfo);

const mapStateToProps = (state, ownProps) => {
	const { boardId } = ownProps.match.params;
	return {
		BOARD: state.BOARDS.boardsResponse[boardId],
		BOARDMEMBERS: Object.values(state.BOARDMEMBERS.boardMembersResponse),
		BOARDERROR: state.BOARDS.fetchError,
		BOARDERRORMESSAGE: state.BOARDS.fetchErrorMessage,
		FETCHTYPE: state.BOARDS.fetchType,
		TOKEN: state.LOGIN_AUTHENTICATION.loginState.loginResponse.authorization,
	};
};

const mapDispatchToProps = { getAllBoardMembersByBoardId, save1_auto, boardPayout };

export default connect(mapStateToProps, mapDispatchToProps)(BoardInfo);
