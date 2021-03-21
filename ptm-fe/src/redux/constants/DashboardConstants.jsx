export const DASHBOARD_ERROR = 'DASHBOARD_ERROR';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const GET_CHART = 'GET_CHART';
export const DASHBOARD_LOADING = 'DASHBOARD_LOADING';
export const DASHBOARD_RESET = 'DASHBOARD_RESET';

export const DashboardReset  = () => {
    return ( {
        type: DASHBOARD_RESET
    } );
}

export const DashboardLoading  = () => {
    return ( {
        type: DASHBOARD_LOADING
    } );
}

export const DashboardError  = error => {
    return ( {
        type: DASHBOARD_ERROR, error:error
    } );
}

export const GetDashboard = data => {
    return ( {
        type: GET_DASHBOARD, payload:data
    } );
}

export const GetChart = data => {
    return ( {
        type: GET_CHART, payload:data
    } );
}
