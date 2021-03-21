export const ADDRESS_GET_BY_USERID = 'ADDRESS_GET_BY_USERID';
export const ADDRESS_GET_ALL = 'ADDRESS_GET_ALL';
export const ADDRESS_GET_BY_ID = 'ADDRESS_GET_BY_ID';
export const ADDRESS_SAVE = 'ADDRESS_SAVE';
export const ADDRESS_UPDATE = 'ADDRESS_UPDATE';
export const ADDRESS_DELETE = 'ADDRESS_DELETE';
export const ADDRESS_LOADING = 'ADDRESS_LOADING';
export const ADDRESS_RESET = 'ADDRESS_RESET';
export const ADDRESS_ERROR = 'ADDRESS_ERROR';

export const AddressReset  = () => {
    return ( {
        type: ADDRESS_RESET
    } );
}

export const AddressLoading  = () => {
    return ( {
        type: ADDRESS_LOADING
    } );
}

export const AddressError  = error => {
    return ( {
        type: ADDRESS_ERROR, error:error
    } );
}

export const AddressGetAll  = data => {
    return ( {
        type: ADDRESS_GET_ALL, payload:data
    } );
}

export const AddressGetByUserID  = data => {
    return ( {
        type: ADDRESS_GET_BY_USERID, payload:data
    } );
}

export const AddressGetByID  = data => {
    return ( {
        type: ADDRESS_GET_BY_ID, payload:data
    } );
}

export const AddressSave  = data => {
    return ( {
        type: ADDRESS_SAVE, payload:data
    } );
}

export const AddressUpdate  = data => {
    return ( {
        type: ADDRESS_UPDATE, payload:data
    } );
}

export const AddressDelete  = data => {
    return ( {
        type: ADDRESS_DELETE, payload:data
    } );
}

