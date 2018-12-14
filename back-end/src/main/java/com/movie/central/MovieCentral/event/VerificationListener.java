package com.movie.central.MovieCentral.event;

import com.movie.central.MovieCentral.exceptions.Error;
import com.movie.central.MovieCentral.exceptions.MovieCentralException;
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
import java.util.Properties;


@Component
public class VerificationListener implements
        ApplicationListener<OnVerificationCompleteEvent> {

    @Autowired
    private CustomerService service;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${client.host}")
    String host;

    @Value("${client.port}")
    String port;

    @Override
    public void onApplicationEvent(OnVerificationCompleteEvent event){
        this.confirmVerification(event);
    }

    private void confirmVerification(OnVerificationCompleteEvent event){
        Customer user = event.getUser();
        String recipientAddress = user.getEmail();
        String subject = "Movie Central Account Verification";
        String confirmationUrl = "  http://" + host + ":" + port + "/login";
        String message = "Account verified successfully.Please click the link below to login to your account : <br>";
        message = message + confirmationUrl;
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