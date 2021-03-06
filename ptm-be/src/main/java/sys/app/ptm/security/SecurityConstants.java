package sys.app.ptm.security;

import sys.app.ptm.SpringApplicationContext;

public class SecurityConstants {
	public static final long EXPIRATION_TIME = 86400000; // 1 day
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";	
	
	/* 	
	 * Dashboard:
	 * GET /api/dashboard/chart
	 * GET /api/dashboard 
	 */
	public static final String DASHBOARD_CHART = "/api/dashboard/chart";
	public static final String DASHBOARD = "/api/dashboard";
	
	/* 	 
	 * Reports:
	 * GET /api/reports/board/{id}
	 * GET /api/reports/member/{id}
	 */		
	public static final String REPORT_BOARD = "/api/reports/board/*";
	public static final String REPORT_MEMBER = "/api/reports/member/*";
	public static final String REPORT_RELEASE = "/api/reports/release/*";
	
	/*
	 * Category:
	 * GET /api/categories/{categoryId}
	 * GET /api/categories
	 * POST /api/categories
	 */
	public static final String CATEGORY_GETBY_CATEGORYID = "/api/categories/*";
	public static final String CATEGORY_ALL = "/api/categories";
	public static final String CATEGORY_SAVE = "/api/categories";
	
	/*
	 * Member: 
	 * GET /api/members
	 * POST /api/members
	 * GET /api/members/{memberId}
	 * PUT /api/members/{memberId}
	 */
	public static final String MEMBER_ALL = "/api/members";
	public static final String MEMBER_SAVE = "/api/members";
	public static final String MEMBER_GETBY_MEMBERID = "/api/members/*";
	public static final String MEMBER_UPDATE = "/api/members/*";
	
	/*
	 * Member Address:
	 * GET /api/memberaddresses/{addressId}
	 * GET /api/memberaddresses/member/{memberId}
	 * GET /api/memberaddresses
	 * POST /api/memberaddresses/{memberId}
	 */
	public static final String MEMBERADDRESS_GETBY_ADDRESSID = "/api/memberaddresses/*";
	public static final String MEMBERADDRESS_GETBY_MEMBER = "/api/memberaddresses/member/*";
	public static final String MEMBERADDRESS_ALL = "/api/memberaddresses";
	public static final String MEMBERADDRESS_SAVE = "/api/memberaddresses/*";
	
	/*
	 * Member Contact:
	 * POST /api/membercontacts/{memberId}
	 * GET /api/membercontacts/{contactId}
	 * GET /api/membercontacts
	 * GET /api/membercontacts/member/{memberId}
	 */
	public static final String MEMBERCONTACT_SAVE = "/api/membercontacts/*";
	public static final String MEMBERCONTACT_GETBY_CONTACTID = "/api/membercontacts/*";
	public static final String MEMBERCONTACT_ALL = "/api/membercontacts";
	public static final String MEMBERCONTACT_GETBY_MEMBER = "/api/membercontacts/member/*";
	
	/*
	 * Board:
	 * GET /api/boards/{boardId}   
	 * GET /api/boards/
	 * POST /api/boards/
	 * GET /api/boards/table
	 * POST /api/boards/payout
	 */
	public static final String BOARD_GETBY_BOARDID = "/api/boards/*";
	public static final String BOARD_ALL = "/api/boards";
	public static final String BOARD_SAVE = "/api/boards";
	public static final String BOARD_TABLE = "/api/boards/table";
	public static final String BOARD_PAYOUT = "/api/boards/payout";
	
	/*
	 * Board Member:
	 * GET /api/boardmembers/{boardMemberId}
	 * PUT /api/boardmembers/save1put/{boardMemberId}/{userId}
	 * GET /api/boardmembers
	 * POST /api/boardmembers
	 * GET /api/boardmembers/board/{boardId}
	 */
	public static final String BOARDMEMBER_GETBY_BOARDMEMBERID = "/api/boardmembers/*";
	public static final String BOARDMEMBER_UPDATE = "/api/boardmembers/save1put/*/*";
	public static final String BOARDMEMBER_ALL = "/api/boards";
	public static final String BOARDMEMBER_SAVE = "/api/boards";
	public static final String BOARDMEMBER_GETBY_BOARD = "/api/boards/board/*";
	
	/*
	 * Authorities:
	 * GET /api/authorities
	 * POST /api/authorities
	 * GET /api/authorities/{userid}
	 * GET /api/authorities/roles/{userid}
	 */
	public static final String AUTHORITY_ALL = "/api/authorities";
	public static final String AUTHORITY_SAVE = "/api/authorities";
	public static final String AUTHORITY_GETBY_USER = "/api/authorities/*";
	public static final String AUTHORITY_GETROLES_USER = "/api/authorities/roles/*";

	/*
	 * Roles:
	 * PUT /api/roles/applyauthorities/{name}
	 * GET /api/roles
	 * POST /api/roles
	 */
	public static final String ROLE_APPLY_AUTHORITIES = "/api/roles/applyauthorities/*";
	public static final String ROLE_ALL= "/api/roles";
	public static final String ROLE_SAVE = "/api/roles";	
	
	/* LOGIN PROFILE */
	public static final String LOGIN_PROFILE = "/api/users/*";
	
	/* 	
	 * Users:
	 * GET /api/users/role/{roleName}
	 * POST /api/users
	 * POST /api/users/{id}/reset-password
	 * GET /api/users/all  
	 * PUT /api/users/{id}
	 * DELETE /api/users/{id}
	 * GET /api/users/{userId} 
	 */
	public static final String USER_GETBY_ROLE = "/api/users/role/*";
	public static final String USER_SAVE = "/api/users";
	public static final String USER_RESET_PASSWORD = "/api/users/resetpassword/*";
	public static final String USER_ALL = "/api/users/all";
	public static final String USER_UPDATE = "/api/users/*";
	public static final String USER_DELETE = "/api/users/*";
	public static final String USER_GETBY_USERID = "/api/users/*";
	
	/* 	
	 * User Address:
	 * GET /api/useraddresses/{addressId}
	 * POST /api/useraddresses/{userId}
	 * GET /api/useraddresses/all
	 */	
	public static final String USERADDRESS_GETBY_ADDRESSID = "/api/useraddresses/*";	
	public static final String USERADDRESS_SAVE = "/api/useraddresses/*";	
	public static final String USERADDRESS_ALL = "/api/useraddresses/all";	
	
	/* 	
	 * UserImages:
	 * PUT /api/userimages/{userId}
	 * POST /api/userimages/{userId}
	 * GET /api/userimages/{imageId}
	 * GET /api/userimages 
	 */
	public static final String USERIMAGE_UPDATE = "/api/userimages/*";	
	public static final String USERIMAGE_SAVE = "/api/userimages/*";	
	public static final String USERIMAGE_GETBY_IMAGEID = "/api/userimages/*";	
	public static final String USERIMAGE_ALL = "/api/userimages";	
	
	/* 	
	 * Recently Added:
	 * GET /api/roles/user/{userId}
	 * GET /api/authorities/role/{roleId}
	 * PUT /api/users/applyrole/{userId}
	 */
	public static final String ROLE_ALL_BY_USER = "/api/roles/user/*";	
	public static final String AUTHORITY_ALL_BY_ROLE = "/api/authorities/byrole/*";	
	public static final String USER_APPLY_ROLE = "/api/users/applyrole/*";
	
	
	
	
	
	/* public static final String TOKEN_SECRET = "dimple"; */

	public static String getTokenSecret() {
		ApplicationProperties appProperties = (ApplicationProperties) SpringApplicationContext.getBean("AppProperties");
		return appProperties.getTokenSecret();
	}
}