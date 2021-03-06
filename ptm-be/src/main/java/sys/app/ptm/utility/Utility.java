package sys.app.ptm.utility;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Random;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import sys.app.ptm.security.SecurityConstants;

@Component
public class Utility {

	private final Random RANDOM = new SecureRandom();
	private final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	private String generateRandomString(int length) {
		StringBuilder returnValue = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
		}
		return new String(returnValue);
	}

	public String generateUserId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UID").append(generateRandomString(length));
		return str.toString();
	}

	public String generateAddressId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UAID").append(generateRandomString(length));
		return str.toString();
	}

	public String generateImageId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UIMGID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateMemberId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UMID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateBoardId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UBID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateCategoryId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UCATID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateMemberAddressId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UMAID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateMemberContactId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UMCID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateRecruitmentId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("URTID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateReleaseId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("URELID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public String generateClaimId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("UCLID").append(generateRandomString(length));
		return str.toString();
	}	
	
	public Date getDateNow(LocalDate localDate) {
		ZoneId TZ = ZoneId.of("Asia/Manila");		
		return Date.from(localDate.atStartOfDay(TZ).toInstant());
	}
	
	public String generateFullName(String f, String m, String l, String s) {
		StringBuilder str = new StringBuilder();		
		if(s==null|s==""|s.equals(null)|"".compareTo(s) == 0) {
			str.append(f +" "+m+" "+l);
		} else {
			str.append(f +" "+m+" "+l+" "+s);
		}
		return str.toString().toUpperCase();
	}

	public String generateEmailVerificationToken(String userId) {
		String token = Jwts.builder().setSubject(userId)
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.getTokenSecret()).compact();
		return token;
	}

	public static boolean hasTokenExpired(String token) {
		boolean returnValue = false;
		try {
			Claims claims = Jwts.parser().setSigningKey(SecurityConstants.getTokenSecret()).parseClaimsJws(token)
					.getBody();

			Date tokenExpirationDate = claims.getExpiration();
			Date todayDate = new Date();

			returnValue = tokenExpirationDate.before(todayDate);
		} catch (ExpiredJwtException ex) {
			returnValue = true;
		}

		return returnValue;
	}

	public String generatePasswordResetToken(String userId) {
		String token = Jwts.builder().setSubject(userId)
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.getTokenSecret()).compact();
		return token;
	}

	public String generateBoardMemberId(int i) {
		StringBuilder str = new StringBuilder();
		str.append("UBMID").append(generateRandomString(i));
		return str.toString();
	}

	public String generateRecruitmentCommissionId(int length) {
		StringBuilder str = new StringBuilder();
		str.append("URCID").append(generateRandomString(length));
		return str.toString();
	}
}
