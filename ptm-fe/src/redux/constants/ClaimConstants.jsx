export const CLAIM_ERROR = 'CLAIM_ERROR';
export const CLAIM_GET_BY_CLAIMID = 'CLAIM_GET_BY_CLAIMID';
export const CLAIM_GET_ALL = 'CLAIM_GET_ALL';
export const CLAIM_GET_BY_ID = 'CLAIM_GET_BY_ID';
export const CLAIM_SAVE = 'CLAIM_SAVE';
export const CLAIM_UPDATE = 'CLAIM_UPDATE';
export const CLAIM_DELETE = 'CLAIM_DELETE';
export const CLAIM_LOADING = 'CLAIM_LOADING';
export const CLAIM_RESET = 'CLAIM_RESET';

export const ClaimLoading = () => {
	return {
		type: CLAIM_LOADING,
	};
};

export const ClaimReset = () => {
	return {
		type: CLAIM_RESET,
	};
};

export const ClaimError = (error) => {
	return {
		type: CLAIM_ERROR,
		error: error,
	};
};

export const ClaimGetAll = (data) => {
	return {
		type: CLAIM_GET_ALL,
		payload: data,
	};
};

export const ClaimGetByClaimID = (data) => {
	return {
		type: CLAIM_GET_BY_CLAIMID,
		payload: data,
	};
};

export const ClaimGetByID = (data) => {
	return {
		type: CLAIM_GET_BY_ID,
		payload: data,
	};
};

export const ClaimSave = (data) => {
	return {
		type: CLAIM_SAVE,
		payload: data,
	};
};

export const ClaimUpdate = (data) => {
	return {
		type: CLAIM_UPDATE,
		payload: data,
	};
};

export const ClaimDelete = (data) => {
	return {
		type: CLAIM_DELETE,
		payload: data,
	};
};
