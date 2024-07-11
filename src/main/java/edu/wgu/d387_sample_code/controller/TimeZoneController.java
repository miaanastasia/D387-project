package edu.wgu.d387_sample_code.controller;

import edu.wgu.d387_sample_code.TimeZoneConverter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
public class TimeZoneController {

    private final TimeZoneConverter timeZoneConverter;

    public TimeZoneController() {
        this.timeZoneConverter = new TimeZoneConverter();

    }

    @GetMapping("/converted-times")
    public String getConvertedTimes() {
        return timeZoneConverter.convertTimes();
    }

}
