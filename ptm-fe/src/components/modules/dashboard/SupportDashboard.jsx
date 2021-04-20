import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDashboard, getChart } from '../../../redux/actions/DashboardActions';
import _ from 'lodash';
import { Chart } from 'primereact/chart';

const MyStyle = {
	issuesCreated: { backgroundColor: '#007ad9', color: '#ffffff' },
	ticketsOpened: { backgroundColor: '#007ad9', color: '#ffffff' },
	tasksOpened: { backgroundColor: '#007ad9', color: '#ffffff' },
	issuesClosed: { backgroundColor: '#007ad9', color: '#ffffff' },
};

const basicOptions = {
	legend: {
		labels: {
			fontColor: '#495057',
		},
	},
	scales: {
		xAxes: [
			{
				ticks: {
					fontColor: '#495057',
				},
			},
		],
		yAxes: [
			{
				ticks: {
					fontColor: '#495057',
				},
			},
		],
	},
};

class SupportDashboard extends Component {
	state = {
		activeIndex: 0,
		data: {
			labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			datasets: [],
		},
	};

	async componentDidMount() {
		await this.props.getChart();
		await this.props.getDashboard();
		this.updateChart();
	}

	componentDidUpdate(prevProps) {
		if (this.props.CHART !== prevProps.CHART) {
			this.updateChart();
		}
	}

	// datasets: state.data.datasets.concat([{
	//     label: 'Board Created',
	//     backgroundColor: '#42A5F5',
	//     data: this.props.CHART.created,
	// }])
	updateChart = _.memoize(() => {
		this.setState((state) => ({
			...state,
			data: {
				...state.data,
				datasets: state.data.datasets.concat([
					{
						label: 'Board Created',
						backgroundColor: '#42A5F5',
						data: this.props.CHART.created,
					},
				]),
			},
		}));

		this.setState((state) => ({
			...state,
			data: {
				...state.data,
				datasets: state.data.datasets.concat([
					{
						label: 'Board Payout',
						backgroundColor: '#FFA726',
						data: this.props.CHART.payout,
					},
				]),
			},
		}));

		this.setState((state) => ({
			...state,
			data: {
				...state.data,
				datasets: state.data.datasets.concat([
					{
						label: 'Board Example',
						backgroundColor: 'black',
						data: [28, 48, 40, 19, 86, 27, 90],
					},
				]),
			},
		}));

		console.log(this.state.data);
	});

	// {
	//     "totalMembers": 14,
	//     "totalBoards": 3,
	//     "totalMembers_Payout": 7,
	//     "totalBoards_Payout": 1,
	//     "totalMembers_Created_Today": 0,
	//     "totalBoards_Created_Today": 0,
	//     "totalBoards_Payout_Today": 0,
	//     "unassigned_Members": 6
	// }

	render() {
		return (
			<>
				<div className='p-col-12 p-lg-4'>
					<div className='card summary'>
						<span className='title'>Members</span>
						<span className='detail'>No. of New Members Today</span>
						<span className='count members'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalMembers_Created_Today}</span>
					</div>
				</div>
				<div className='p-col-12 p-lg-4'>
					<div className='card summary'>
						<span className='title'>Boards</span>
						<span className='detail'>No. of Boards Created Today</span>
						<span className='count teams'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalBoards_Created_Today}</span>
					</div>
				</div>
				<div className='p-col-12 p-lg-4'>
					<div className='card summary'>
						<span className='title'>Payouts</span>
						<span className='detail'>No. Board Payouts Today</span>
						<span className='count payouts'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalBoards_Payout_Today}</span>
					</div>
				</div>

				<div className='p-col-12 p-md-6 p-xl-3'>
					<div className='highlight-box'>
						<div className='initials' style={MyStyle.issuesCreated}>
							<span>UM</span>
						</div>
						<div className='highlight-details '>
							<span>
								{' '}
								<i className='pi pi-search' />
								Unassigned Members
							</span>
							<span className='count'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.unassigned_Members}</span>
						</div>
					</div>
				</div>

				<div className='p-col-12 p-md-6 p-xl-3'>
					<div className='highlight-box'>
						<div className='initials' style={MyStyle.ticketsOpened}>
							<span>AM</span>
						</div>
						<div className='highlight-details '>
							<span>
								<i className='pi pi-question-circle' />
								Active Members
							</span>
							<span className='count'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalMembers}</span>
						</div>
					</div>
				</div>

				<div className='p-col-12 p-md-6 p-xl-3'>
					<div className='highlight-box'>
						<div className='initials' style={MyStyle.tasksOpened}>
							<span>BP</span>
						</div>
						<div className='highlight-details '>
							<span>
								<i className='pi pi-filter' />
								Board Payouts
							</span>
							<span className='count'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalBoards_Payout}</span>
						</div>
					</div>
				</div>

				<div className='p-col-12 p-md-6 p-xl-3'>
					<div className='highlight-box'>
						<div className='initials' style={MyStyle.issuesClosed}>
							<span>TT</span>
						</div>
						<div className='highlight-details '>
							<span>
								<i className='pi pi-check' />
								Total Boards
							</span>
							<span className='count'>{_.isEmpty(this.props.DASHBOARD) ? '0' : this.props.DASHBOARD.totalBoards}</span>
						</div>
					</div>
				</div>

				<div className='p-col-12 p-md-12 p-lg-12'>
					<div className='card' style={{ border: '1px solid ' }}>
						<h5>Board Forecast Chart - This Week</h5>
						<Chart type='bar' data={this.state.data} options={basicOptions} />
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		DASHBOARD: state.DASHBOARD.dashboardResponse,
		CHART: state.DASHBOARD.chartResponse,
	};
};

const mapDispatchToProps = { getDashboard, getChart };

export default connect(mapStateToProps, mapDispatchToProps)(SupportDashboard);
