export const MEMBERADDRESS_GET_BY_MEMBER = 'MEMBERADDRESS_GET_BY_MEMBER';
export const MEMBERADDRESS_GET_ALL = 'MEMBERADDRESS_GET_ALL';
export const MEMBERADDRESS_GET_BY_ADDRESSID = 'MEMBERADDRESS_GET_BY_ADDRESSID';
export const MEMBERADDRESS_SAVE = 'MEMBERADDRESS_SAVE';
export const MEMBERADDRESS_UPDATE = 'MEMBERADDRESS_UPDATE';
export const MEMBERADDRESS_DELETE = 'MEMBERADDRESS_DELETE';
export const MEMBERADDRESS_LOADING = 'MEMBERADDRESS_LOADING';
export const MEMBERADDRESS_RESET = 'MEMBERADDRESS_RESET';
export const MEMBERADDRESS_ERROR = 'MEMBERADDRESS_ERROR';
export const MEMBERADDRESS_CLEAR = 'MEMBERADDRESS_CLEAR';
export const MEMBERADDRESS_GET_ALL_BY_MEMBERID = 'MEMBERADDRESS_GET_ALL_BY_MEMBERID';

export const MemberAddressReset  = () => {
    return ( {
        type: MEMBERADDRESS_RESET
    } );
}

export const MemberAddressClear  = () => {
    return ( {
        type: MEMBERADDRESS_CLEAR
    } );
}

export const MemberAddressLoading  = () => {
    return ( {
        type: MEMBERADDRESS_LOADING
    } );
}

export const MemberAddressError  = error => {
    return ( {
        type: MEMBERADDRESS_ERROR, error:error
    } );
}

export const MemberAddressGetAll  = data => {
    return ( {
        type: MEMBERADDRESS_GET_ALL, payload:data
    } );
}

export const MemberAddressGetByMember  = data => {
    return ( {
        type: MEMBERADDRESS_GET_BY_MEMBER, payload:data
    } );
}

export const MemberAddressGetByAddressID  = data => {
    return ( {
        type: MEMBERADDRESS_GET_BY_ADDRESSID, payload:data
    } );
}

export const MemberAddressSave  = data => {
    return ( {
        type: MEMBERADDRESS_SAVE, payload:data
    } );
}

export const MemberAddressUpdate  = data => {
    return ( {
        type: MEMBERADDRESS_UPDATE, payload:data
    } );
}

export const MemberAddressDelete  = data => {
    return ( {
        type: MEMBERADDRESS_DELETE, payload:data
    } );
}

export const MemberAddressGetAllByMemberId  = data => {
    return ( {
        type: MEMBERADDRESS_GET_ALL_BY_MEMBERID, payload:data
    } );
}
