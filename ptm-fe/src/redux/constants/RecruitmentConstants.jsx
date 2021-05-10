export const RECRUITMENT_ERROR = 'RECRUITMENT_ERROR';
export const RECRUITMENT_GET_BY_RECRUITMENTID = 'RECRUITMENT_GET_BY_RECRUITMENTID';
export const RECRUITMENT_GET_ALL = 'RECRUITMENT_GET_ALL';
export const RECRUITMENT_GET_BY_ID = 'RECRUITMENT_GET_BY_ID';
export const RECRUITMENT_SAVE = 'RECRUITMENT_SAVE';
export const RECRUITMENT_UPDATE = 'RECRUITMENT_UPDATE';
export const RECRUITMENT_DELETE = 'RECRUITMENT_DELETE';
export const RECRUITMENT_LOADING = 'RECRUITMENT_LOADING';
export const RECRUITMENT_RESET = 'RECRUITMENT_RESET';

export const RecruitmentLoading = () => {
	return {
		type: RECRUITMENT_LOADING,
	};
};

export const RecruitmentReset = () => {
	return {
		type: RECRUITMENT_RESET,
	};
};

export const RecruitmentError = (error) => {
	return {
		type: RECRUITMENT_ERROR,
		error: error,
	};
};

export const RecruitmentGetAll = (data) => {
	return {
		type: RECRUITMENT_GET_ALL,
		payload: data,
	};
};

export const RecruitmentGetByRecruitmentID = (data) => {
	return {
		type: RECRUITMENT_GET_BY_RECRUITMENTID,
		payload: data,
	};
};

export const RecruitmentGetByID = (data) => {
	return {
		type: RECRUITMENT_GET_BY_ID,
		payload: data,
	};
};

export const RecruitmentSave = (data) => {
	return {
		type: RECRUITMENT_SAVE,
		payload: data,
	};
};

export const RecruitmentUpdate = (data) => {
	return {
		type: RECRUITMENT_UPDATE,
		payload: data,
	};
};

export const RecruitmentDelete = (data) => {
	return {
		type: RECRUITMENT_DELETE,
		payload: data,
	};
};
