package edu.wgu.d387_sample_code.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Properties;

@Service
public class DisplayWelcome {

    private Properties prop = new Properties();

    public String getWelcomeMessage(String resourceName) {
        try (InputStream stream = new ClassPathResource(resourceName).getInputStream()) {
            prop.load(stream);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return prop.getProperty("welcomeMessage");

    }

}




 //   public DisplayWelcome() { }

 /*   public void loadProperties(String resourceName) {
        Resource resource = new ClassPathResource(resourceName);
        try (InputStream stream = resource.getInputStream()) {
            prop.load(stream);
        } catch (IOException e){
            e.printStackTrace();
        }
    }

  */







