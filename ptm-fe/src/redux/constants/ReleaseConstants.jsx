export const RELEASE_ERROR = 'RELEASE_ERROR';
export const RELEASE_GET_BY_RELEASEID = 'RELEASE_GET_BY_RELEASEID';
export const RELEASE_GET_ALL = 'RELEASE_GET_ALL';
export const RELEASE_GET_BY_ID = 'RELEASE_GET_BY_ID';
export const RELEASE_SAVE = 'RELEASE_SAVE';
export const RELEASE_UPDATE = 'RELEASE_UPDATE';
export const RELEASE_DELETE = 'RELEASE_DELETE';
export const RELEASE_LOADING = 'RELEASE_LOADING';
export const RELEASE_RESET = 'RELEASE_RESET';

export const ReleaseLoading = () => {
	return {
		type: RELEASE_LOADING,
	};
};

export const ReleaseReset = () => {
	return {
		type: RELEASE_RESET,
	};
};

export const ReleaseError = (error) => {
	return {
		type: RELEASE_ERROR,
		error: error,
	};
};

export const ReleaseGetAll = (data) => {
	return {
		type: RELEASE_GET_ALL,
		payload: data,
	};
};

export const ReleaseGetByReleaseID = (data) => {
	return {
		type: RELEASE_GET_BY_RELEASEID,
		payload: data,
	};
};

export const ReleaseGetByID = (data) => {
	return {
		type: RELEASE_GET_BY_ID,
		payload: data,
	};
};

export const ReleaseSave = (data) => {
	return {
		type: RELEASE_SAVE,
		payload: data,
	};
};

export const ReleaseUpdate = (data) => {
	return {
		type: RELEASE_UPDATE,
		payload: data,
	};
};

export const ReleaseDelete = (data) => {
	return {
		type: RELEASE_DELETE,
		payload: data,
	};
};
