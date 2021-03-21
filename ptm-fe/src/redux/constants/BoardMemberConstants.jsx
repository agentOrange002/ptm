export const BOARDMEMBER_ERROR = 'BOARDMEMBER_ERROR';
export const BOARDMEMBER_GET_ALL_BY_BOARDID = 'BOARDMEMBER_GET_ALL_BY_BOARDID';
export const BOARDMEMBER_GET_ALL = 'BOARDMEMBER_GET_ALL';
export const BOARDMEMBER_GET_BY_ID = 'BOARDMEMBER_GET_BY_ID';
export const BOARDMEMBER_SAVE = 'BOARDMEMBER_SAVE';
export const BOARDMEMBER_UPDATE = 'BOARDMEMBER_UPDATE';
export const BOARDMEMBER_DELETE = 'BOARDMEMBER_DELETE';
export const BOARDMEMBER_LOADING = 'BOARDMEMBER_LOADING';
export const BOARDMEMBER_RESET = 'BOARDMEMBER_RESET';
export const BOARDMEMBER_SAVE1 = 'BOARDMEMBER_SAVE1';

export const BoardMemberLoading  = () => {
    return ( {
        type: BOARDMEMBER_LOADING
    } );
}

export const BoardMemberReset  = () => {
    return ( {
        type: BOARDMEMBER_RESET
    } );
}

export const BoardMemberError  = error => {
    return ( {
        type: BOARDMEMBER_ERROR, error:error
    } );
}

export const BoardMemberGetAll = data => {
    return ( {
        type: BOARDMEMBER_GET_ALL, payload:data
    } );
}

export const BoardMemberGetAllByBoardID = data => {
    return ( {
        type: BOARDMEMBER_GET_ALL_BY_BOARDID, payload:data
    } );
}

export const BoardMemberGetByID  = data => {
    return ( {
        type: BOARDMEMBER_GET_BY_ID, payload:data
    } );
}

export const BoardMemberSave  = data => {
    return ( {
        type: BOARDMEMBER_SAVE, payload:data
    } );
}

export const BoardMemberUpdate  = data => {
    return ( {
        type: BOARDMEMBER_UPDATE, payload:data
    } );
}

export const BoardMemberDelete  = data => {
    return ( {
        type: BOARDMEMBER_DELETE, payload:data
    } );
}

export const BoardMemberSave1  = data => {
    return ( {
        type: BOARDMEMBER_SAVE1, payload:data
    } );
}
