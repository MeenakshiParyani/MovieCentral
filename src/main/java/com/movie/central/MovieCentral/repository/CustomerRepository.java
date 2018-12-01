package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
<<<<<<< Updated upstream
=======


   // List<Object[]> findMovieAndPlayHistoryByCustomer_Id(Long id);
>>>>>>> Stashed changes
}
