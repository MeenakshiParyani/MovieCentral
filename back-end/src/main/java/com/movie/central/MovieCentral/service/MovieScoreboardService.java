package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.model.CustomerRatingId;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.repository.CustomerRatingRepository;
import com.movie.central.MovieCentral.repository.MovieRepository;
import com.movie.central.MovieCentral.repository.PlayHistoryRepository;
import com.movie.central.MovieCentral.util.LocalDateTimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MovieScoreboardService {

    @Autowired
    CustomerRatingRepository customerRatingRepository;

    @Autowired
    PlayHistoryRepository playHistoryRepository;

    @Autowired
    MovieRepository movieRepository;

    public List<Movie> getMostHighlyRatedMoviesInGivenMonth(int month, int year){

        LocalDateTime startDateTime = LocalDateTimeUtil.getFirstDayOfGivenMonth(month, year);
        LocalDateTime endDateTime = LocalDateTimeUtil.getLastDayOfGivenMonth(startDateTime);

        List<CustomerRatingId> movies = customerRatingRepository.
                findDistinctByRatingTimeAfterAndRatingTimeBefore(startDateTime, endDateTime);
        Set<Movie> highlyRatedMoviesInMonth = movies.stream()
                .map(elem -> elem.getMovie())
                .limit(10)
                .collect(Collectors.toSet());;

        List<Movie> result = new ArrayList<>();
        result.addAll(highlyRatedMoviesInMonth);
        return result;
    }

    public List<Movie> getMostPopularMoviesInGivenMonth(int month, int year){

        LocalDateTime startDateTime = LocalDateTimeUtil.getFirstDayOfGivenMonth(month, year);
        LocalDateTime endDateTime = LocalDateTimeUtil.getLastDayOfGivenMonth(startDateTime);

        Set<Movie> highlyRatedMoviesInMonth = playHistoryRepository.
                getTopTenMoviesPlayCountInMonth(startDateTime, endDateTime)
                .stream()
                .map(elem -> movieRepository.getOne((Long)elem))
                .limit(10)
                .collect(Collectors.toSet());
        List<Movie> result = new ArrayList<>();
        result.addAll(highlyRatedMoviesInMonth);
        return result;
    }
}
