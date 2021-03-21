package sys.app.ptm.exception;

import java.util.Date;

import javax.servlet.ServletException;

import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(value = { Exception.class	 })
	public ResponseEntity<Object> handleAnyException(Exception ex, WebRequest request) {
		String desc = ex.getLocalizedMessage();
		if(desc==null) desc =ex.toString();
		ErrorMessage errorMessage = new ErrorMessage(new Date(), desc);
		return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = { 			
			ServletException.class,
			ExpiredJwtException.class,
			NullPointerException.class,
			ClientAbortException.class})
	public ResponseEntity<Object> handleSpecificException(Exception ex, WebRequest request) {
		String desc = ex.getLocalizedMessage();
		if(desc==null) desc =ex.toString();
		ErrorMessage errorMessage = new ErrorMessage(new Date(), desc);
		return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = { ApplicationServiceException.class })
	public ResponseEntity<Object> handleServiceException(ApplicationServiceException ex, WebRequest request) {
		ErrorMessage errorMessage = new ErrorMessage(new Date(), ex.getMessage());
		return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	

}
