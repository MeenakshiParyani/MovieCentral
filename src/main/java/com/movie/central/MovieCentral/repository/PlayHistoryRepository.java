package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.PlayHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayHistoryRepository extends JpaRepository<PlayHistory, Long> {

    @Query(value = "select * from play_history p, movie m where p.customer_id = ?1 and p.movie_id = m.id", nativeQuery = true)
    List<PlayHistory> findMovieAndPlayHistoryByCustomer_Id(Long customerId);

    @Query(value = "select p.movie_id, m.title, count(p.movie_id) as playcount from play_history p, movie m where p.movie_id = m.id group by movie_id", nativeQuery = true)
    List<Object[]> getPlayPerMovie();

    @Query(value = "select p.movie_id, m.title, count(p.movie_id) as playcount from play_history p, movie m where p.movie_id = m.id group by movie_id order by playcount limit 10", nativeQuery = true)
    List<Object[]> getMostPlayedMovies();

    @Query(value = "select p.customer_id, m.name, count(p.customer_id) as playcount from play_history p, customer m where p.customer_id = m.id group by customer_id order by playcount limit 10", nativeQuery = true)
    List<Object[]> getMostActiveCustomers();

    //List<PlayHistory>
    //List<PlayHistory> getPlayHistoryByCustomerId(Long customerId);
}
