package edu.wgu.d387_sample_code;


import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class TimeZoneConverter {

    public String convertTimes() {

        ZonedDateTime eastern = ZonedDateTime.now(ZoneId.of("America/New_York"))
                .withHour(12).withMinute(30);
        ZonedDateTime mountain = eastern.withZoneSameInstant(ZoneId.of("America/Denver"));
        ZonedDateTime utc = eastern.withZoneSameInstant(ZoneId.of("UTC"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a z");
        String formattedET = eastern.format(formatter);
        String formattedMT = mountain.format(formatter);
        String formattedUTC = utc.format(formatter);

        return "Join us for an online live presentation held at the Landon Hotel on July 15, 2024 at "
                + formattedET + " | " + formattedMT + " | " + formattedUTC;
    }


}
