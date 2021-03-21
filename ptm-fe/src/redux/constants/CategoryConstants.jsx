export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const CATEGORY_GET_BY_CATEGORYID = 'CATEGORY_GET_BY_CATEGORYID';
export const CATEGORY_GET_ALL = 'CATEGORY_GET_ALL';
export const CATEGORY_GET_BY_ID = 'CATEGORY_GET_BY_ID';
export const CATEGORY_SAVE = 'CATEGORY_SAVE';
export const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
export const CATEGORY_DELETE = 'CATEGORY_DELETE';
export const CATEGORY_LOADING = 'CATEGORY_LOADING';
export const CATEGORY_RESET = 'CATEGORY_RESET';

export const CategoryLoading  = () => {
    return ( {
        type: CATEGORY_LOADING
    } );
}

export const CategoryReset  = () => {
    return ( {
        type: CATEGORY_RESET
    } );
}

export const CategoryError  = error => {
    return ( {
        type: CATEGORY_ERROR, error:error
    } );
}

export const CategoryGetAll = data => {
    return ( {
        type: CATEGORY_GET_ALL, payload:data
    } );
}

export const CategoryGetByCategoryID = data => {
    return ( {
        type: CATEGORY_GET_BY_CATEGORYID, payload:data
    } );
}

export const CategoryGetByID  = data => {
    return ( {
        type: CATEGORY_GET_BY_ID, payload:data
    } );
}

export const CategorySave  = data => {
    return ( {
        type: CATEGORY_SAVE, payload:data
    } );
}

export const CategoryUpdate  = data => {
    return ( {
        type: CATEGORY_UPDATE, payload:data
    } );
}

export const CategoryDelete  = data => {
    return ( {
        type: CATEGORY_DELETE, payload:data
    } );
}

