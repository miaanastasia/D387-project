package edu.wgu.d387_sample_code.service;

import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.Locale;
import java.util.Properties;

public class DisplayWelcome {

    private Properties prop = new Properties();

    public DisplayWelcome(String resourceName) {
        try (InputStream stream = new ClassPathResource(resourceName).getInputStream()) {
            prop.load(stream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getWelcomeMessage() {
        return prop.getProperty("welcomeMessage");
    }

}