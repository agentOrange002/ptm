package sys.app.ptm.exception;

public enum ErrorMessages {
	MISSING_REQUIRED_FIELD("Missing required field. Please check documentation for required fields"),
	LOGIN_FAILED("Failed to Login"), 
	RECORD_ALREADY_EXISTS("Record already exists"),
	CATEGORY_NAME_ALREADY_EXISTS("Record already exists! Please try different category name."),
	INTERNAL_SERVER_ERROR("Internal server error"), 
	NO_RECORD_FOUND("Record with provided id is not found"),
	AUTHENTICATION_FAILED("Authentication failed"), 
	COULD_NOT_UPDATE_RECORD("Could not update record"),
	COULD_NOT_DELETE_RECORD("Could not delete record"),
	EMAIL_ADDRESS_NOT_VERIFIED("Email address could not be verified"),	
	USER_NOT_FOUND("User ID not exist."),
	BOARD_NAME_ALREADY_EXISTS("Record already exists! Please try different board name."),
	BOARD_NOT_COMPLETE("Board Not Ready For Payout! Please complete your board members."),
	BOARD_NOT_PAYOUT("Board Not Ready For Payout! Please Check."),
	BOARD_HAS_ALREADY_CLAIMED("Board has already claimed! Please Check."),
	BOARD_PAYOUT_COMPLETE("Board has already been payout."),
	BOARD_MEMBER_HAS_ALREADY_ASSIGNED("Board Member has already assigned. Use different Board Position."),
	MEMBER_HAS_ALREADY_EXIST_IN_THIS_BOARD("Member has already exist in this board. Use different Member."),
	MEMBER_HAS_ALREADY_EXIST_IN_OTHER_BOARD("Member has already exist on the other board. Use different Member."),
	MEMBER_FULLNAME_ALREADY_REGISTER("This Member Name has already register. Please try different Name."),
	ROLE_NAME_HAS_ALREADY_EXIST("Record already exists! Please try different role name."),
	EMAIL_HAS_ALREADY_EXIST("Record already exists! Please try different email."),
	USER_HAS_ALREADY_EXIST("Record already exists! Please try user name."),
	MEMBER_HAS_ALREADY_RECRUITED("Members entered has already recruited"),	
	MEMBER_HAS_ALREADY_AN_EXISTING_RECRUITMENTINFO("Member has already an existing recruitment info. No need to proceed."),
	BOARD_NOT_READY_FOR_CLAIM("Board not ready for claim. Please check the status."),
	BOARD_HAS_ALREADY_EXIST_IN_OTHER_RELEASING("Record already exists! Please try other board.");
	
	private String errorMessage;

	ErrorMessages(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
