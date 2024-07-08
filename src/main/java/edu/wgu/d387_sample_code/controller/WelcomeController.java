package edu.wgu.d387_sample_code.controller;

import edu.wgu.d387_sample_code.service.DisplayWelcome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@CrossOrigin("http://localhost:4200")
@RestController
public class WelcomeController {

    private static final ExecutorService messageExecutor = Executors.newFixedThreadPool(5);

    @Autowired
    private final DisplayWelcome displayWelcome;

    public WelcomeController(DisplayWelcome displayWelcome) {
        this.displayWelcome = displayWelcome;
    }

    @GetMapping("/welcome-messages")
    public String[] getWelcomeMessage() {
        try {


            Future<String> future1 = messageExecutor.submit(() -> displayWelcome.getWelcomeMessage("welcome_en_US.properties"));
            Future<String> future2 = messageExecutor.submit(() -> displayWelcome.getWelcomeMessage("welcome_fr_CA.properties"));

            String msg1 = future1.get();
            String msg2 = future2.get();

            return new String[]{msg1, msg2};

        } catch (Exception e) {
            e.printStackTrace();
            return new String[] { "Error loading welcome messages" };
        }
    }
}



 /*  Future<String> future1 = messageExecutor.submit(() -> {
                DisplayWelcome msg_en = new DisplayWelcome("welcome_en_US.properties");
                return msg_en.getWelcomeMessage();

            });
            Future<String> future2 = messageExecutor.submit(() -> {
                DisplayWelcome msg_fr = new DisplayWelcome("welcome_fr_CA.properties");
                return msg_fr.getWelcomeMessage();

            });

           */