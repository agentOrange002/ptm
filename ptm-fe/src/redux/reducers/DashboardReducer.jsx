import { DASHBOARD_ERROR, GET_DASHBOARD, GET_CHART, DASHBOARD_RESET } from '../constants/DashboardConstants';

const DashboardState = {
	dashboardResponse: [],
    chartResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const DASHBOARD = (state = DashboardState, action) => {
	switch (action.type) {
		case DASHBOARD_RESET:
			return {
				...state,
				dashboardResponse: [],
				chartResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case GET_DASHBOARD:
			return {
				...state,
				dashboardResponse: action.payload,
				chartResponse: { ...state.chartResponse },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case GET_CHART:
			return {
				...state,
				dashboardResponse: { ...state.dashboardResponse },
				chartResponse: action.payload,
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case DASHBOARD_ERROR:
			return {
				...state,
				dashboardResponse: { ...state.dashboardResponse },
				chartResponse: { ...state.chartResponse },
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
