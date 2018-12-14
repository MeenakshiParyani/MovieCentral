package com.movie.central.MovieCentral.event;

import com.movie.central.MovieCentral.model.Customer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;
@Getter
@Setter
public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private Customer user;

    public OnRegistrationCompleteEvent(Customer user, String appUrl) {
        super(user);

        this.user = user;
        this.appUrl = appUrl;
    }

}
