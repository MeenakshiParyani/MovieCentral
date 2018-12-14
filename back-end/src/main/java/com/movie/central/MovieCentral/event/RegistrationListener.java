package com.movie.central.MovieCentral.event;

import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Locale;
import java.util.Properties;
import java.util.UUID;

@Component
public class RegistrationListener implements
        ApplicationListener<OnRegistrationCompleteEvent> {

    @Autowired
    private CustomerService service;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${server.host}")
    String host;

    @Value("${server.port}")
    String port;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event){
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        Customer user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Movie Central Registration Confirmation";
        String confirmationUrl
                = event.getAppUrl() + "verify?token=" + token;
        String message = "Registered successfully.Please click the link below to verify your account : <br>";
        message = message + "  http://" + host + ":" + port + confirmationUrl;
        try{
            MimeBodyPart mbp = new MimeBodyPart();
            mbp.setContent(message, "text/html");
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mbp);

            Session session = Session.getDefaultInstance(new Properties());
            MimeMessage email = new MimeMessage(session);
            email.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
            email.setSubject(subject);
            email.setContent(multipart);
            mailSender.send(email);
        }catch(MessagingException ex) {
            ex.printStackTrace();
        }

    }
}