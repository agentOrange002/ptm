package sys.app.ptm.tool;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Locale;

import org.springframework.stereotype.Component;

@Component
public class ThisLocalizedWeek {

	// Try and always specify the time zone you're working with
	private ZoneId TZ = ZoneId.of("Asia/Manila");
	private TemporalField fieldUS = WeekFields.of(Locale.US).dayOfWeek();	

	public LocalDate getFirstDay() {
		return LocalDate.now(TZ).with(fieldUS,1);
	}	

	public LocalDate getSecondDay() {
		return LocalDate.now(TZ).with(fieldUS,2);
	}

	public LocalDate getThirdDay() {
		return LocalDate.now(TZ).with(fieldUS,3);
	}

	public LocalDate getFourthDay() {
		return LocalDate.now(TZ).with(fieldUS,4);
	}

	public LocalDate getFifthDay() {
		return LocalDate.now(TZ).with(fieldUS,5);
	}

	public LocalDate getSixthDay() {
		return LocalDate.now(TZ).with(fieldUS,6);
	}
	
	public LocalDate getLastDay() {
		return LocalDate.now(TZ).with(fieldUS,7);
	}

}