package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository
        extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(Customer user);
}
