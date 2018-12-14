package com.movie.central.MovieCentral.event;

import com.movie.central.MovieCentral.model.Customer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnVerificationCompleteEvent extends ApplicationEvent{
    private String appUrl;
    private Customer user;

    public OnVerificationCompleteEvent(Customer user) {
        super(user);

        this.user = user;
    }
}



