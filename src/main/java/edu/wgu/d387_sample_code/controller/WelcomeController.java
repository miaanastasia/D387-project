package edu.wgu.d387_sample_code.controller;

import edu.wgu.d387_sample_code.service.DisplayWelcome;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@RestController
public class WelcomeController {
    private static final ExecutorService messageExecutor = Executors.newFixedThreadPool(5);

    @GetMapping("/welcome-messages")
    public String getWelcomeMessage() {
        try {
            Future<String> future1 = messageExecutor.submit(() -> {
                DisplayWelcome msg_en = new DisplayWelcome("welcome_en_US.properties");
                return msg_en.getWelcomeMessage();
            });
            Future<String> future2 = messageExecutor.submit(() -> {
                DisplayWelcome msg_fr = new DisplayWelcome("welcome_fr_CA.properties");
                return msg_fr.getWelcomeMessage();
            });

            String msg1 = future1.get();
            String msg2 = future2.get();

            return "<html><body>" +
                    "<h1>Messages</h1>" +
                    "<p>" + msg1 + "</p>" +
                    "<p>" + msg2 + "</p>" +
                    "</body></html>";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error loading welcome messages";
        }
    }
}
