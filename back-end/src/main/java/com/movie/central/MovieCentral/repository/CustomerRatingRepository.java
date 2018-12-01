package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.model.CustomerRating;
import com.movie.central.MovieCentral.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRatingRepository extends JpaRepository<CustomerRating, Long> {
    List<CustomerRating> findDistinctByCustomerRatingIdCustomerAndCustomerRatingIdMovie(Customer customer, Movie movie);

    List<CustomerRating> findDistinctByCustomerRatingIdCustomer(Customer customer);

    List<CustomerRating> findDistinctByCustomerRatingIdMovie(Movie movie);
}
