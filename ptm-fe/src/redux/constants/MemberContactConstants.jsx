export const MEMBERCONTACT_GET_BY_MEMBER = 'MEMBERCONTACT_GET_BY_MEMBER';
export const MEMBERCONTACT_GET_ALL = 'MEMBERCONTACT_GET_ALL';
export const MEMBERCONTACT_GET_BY_CONTACTID = 'MEMBERCONTACT_GET_BY_CONTACTID';
export const MEMBERCONTACT_SAVE = 'MEMBERCONTACT_SAVE';
export const MEMBERCONTACT_UPDATE = 'MEMBERCONTACT_UPDATE';
export const MEMBERCONTACT_DELETE = 'MEMBERCONTACT_DELETE';
export const MEMBERCONTACT_LOADING = 'MEMBERCONTACT_LOADING';
export const MEMBERCONTACT_RESET = 'MEMBERCONTACT_RESET';
export const MEMBERCONTACT_ERROR = 'MEMBERCONTACT_ERROR';
export const MEMBERCONTACT_GET_ALL_BY_MEMBERID = 'MEMBERCONTACT_GET_ALL_BY_MEMBERID';
export const MEMBERCONTACT_CLEAR = 'MEMBERCONTACT_CLEAR';

export const MemberContactReset  = () => {
    return ( {
        type: MEMBERCONTACT_RESET
    } );
}

export const MemberContactClear  = () => {
    return ( {
        type: MEMBERCONTACT_CLEAR
    } );
}

export const MemberContactLoading  = () => {
    return ( {
        type: MEMBERCONTACT_LOADING
    } );
}

export const MemberContactError  = error => {
    return ( {
        type: MEMBERCONTACT_ERROR, error:error
    } );
}

export const MemberContactGetAll  = data => {
    return ( {
        type: MEMBERCONTACT_GET_ALL, payload:data
    } );
}

export const MemberContactGetAllByMemberId  = data => {
    return ( {
        type: MEMBERCONTACT_GET_ALL_BY_MEMBERID, payload:data
    } );
}

export const MemberContactGetByMember  = data => {
    return ( {
        type: MEMBERCONTACT_GET_BY_MEMBER, payload:data
    } );
}

export const MemberContactGetByContactID  = data => {
    return ( {
        type: MEMBERCONTACT_GET_BY_CONTACTID, payload:data
    } );
}

export const MemberContactSave  = data => {
    return ( {
        type: MEMBERCONTACT_SAVE, payload:data
    } );
}

export const MemberContactUpdate  = data => {
    return ( {
        type: MEMBERCONTACT_UPDATE, payload:data
    } );
}

export const MemberContactDelete  = data => {
    return ( {
        type: MEMBERCONTACT_DELETE, payload:data
    } );
}

