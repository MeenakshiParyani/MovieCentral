package com.movie.central.MovieCentral.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Properties;


@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {



    @Value("${client.host}")
    String host;

    @Value("${client.port}")
    String port;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String allowedOrigin = "http://" + host + ":" + port;
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigin)
                .allowCredentials(true);
    }


    @Bean
    public JavaMailSenderImpl mailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setProtocol("smtp");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("moviecentralteam14@gmail.com");
        javaMailSender.setPassword("Moviecentralteam14!");
        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        return javaMailSender;
    }


}
