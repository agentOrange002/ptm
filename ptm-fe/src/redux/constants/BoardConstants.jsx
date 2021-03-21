export const BOARD_ERROR = 'BOARD_ERROR';
export const BOARD_GET_ALL_BY_BOARDID = 'BOARD_GET_ALL_BY_BOARDID';
export const BOARD_GET_ALL = 'BOARD_GET_ALL';
export const BOARD_GET_BY_ID = 'BOARD_GET_BY_ID';
export const BOARD_SAVE = 'BOARD_SAVE';
export const BOARD_UPDATE = 'BOARD_UPDATE';
export const BOARD_DELETE = 'BOARD_DELETE';
export const BOARD_LOADING = 'BOARD_LOADING';
export const BOARD_RESET = 'BOARD_RESET';
export const BOARD_PAYOUT = 'BOARD_PAYOUT';

export const BoardLoading  = () => {
    return ( {
        type: BOARD_LOADING
    } );
}

export const BoardReset  = () => {
    return ( {
        type: BOARD_RESET
    } );
}

export const BoardError  = error => {
    return ( {
        type: BOARD_ERROR, error:error
    } );
}

export const BoardGetAll = data => {
    return ( {
        type: BOARD_GET_ALL, payload:data
    } );
}

export const BoardGetAllByBoardID = data => {
    return ( {
        type: BOARD_GET_ALL_BY_BOARDID, payload:data
    } );
}

export const BoardGetByID  = data => {
    return ( {
        type: BOARD_GET_BY_ID, payload:data
    } );
}

export const BoardSave  = data => {
    return ( {
        type: BOARD_SAVE, payload:data
    } );
}

export const BoardUpdate  = data => {
    return ( {
        type: BOARD_UPDATE, payload:data
    } );
}

export const BoardDelete  = data => {
    return ( {
        type: BOARD_DELETE, payload:data
    } );
}

export const BoardPayout  = data => {
    return ( {
        type: BOARD_PAYOUT, payload:data
    } );
}

