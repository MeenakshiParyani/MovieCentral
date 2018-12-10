package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.model.CustomerRating;
import com.movie.central.MovieCentral.model.CustomerRatingId;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.repository.CustomerRatingRepository;
import com.movie.central.MovieCentral.repository.MovieRepository;
import com.movie.central.MovieCentral.repository.PlayHistoryRepository;
import com.movie.central.MovieCentral.response.MovieRatings;
import com.movie.central.MovieCentral.response.PlayDetails;
import com.movie.central.MovieCentral.util.LocalDateTimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.ZoneId;
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

    public List<MovieRatings> getMostHighlyRatedMoviesInGivenMonth(){

        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault());
        LocalDateTime endDateTime = startDateTime.minusMonths(1);

        List<Object[]> ratings = customerRatingRepository.findTopTenByAverageRatingInLastMonth(endDateTime, startDateTime);
        List<MovieRatings> movieRatings = new ArrayList<MovieRatings>();

        try {
            if (ratings != null && ratings.size() > 0) {


                for (Object[] obj : ratings) {
                    MovieRatings movieRating = new MovieRatings();
                    movieRating.setId((BigInteger) obj[0]);
                    movieRating.setName((String) obj[1]);
                    if(obj[2] != null)
                        movieRating.setRating((BigDecimal) obj[2]);
                    else
                        movieRating.setRating(BigDecimal.valueOf(0.0));
                    movieRatings.add(movieRating);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieRatings;
    }

    public List<PlayDetails> getMostPopularMoviesInGivenMonth(){

        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault());
        LocalDateTime endDateTime = startDateTime.minusMonths(1);

        List<Object[]> playDetails = playHistoryRepository.getTopTenMoviesPlayCountInMonth(endDateTime, startDateTime);
        List<PlayDetails> playDetailsNew = new ArrayList<PlayDetails>();

        try {
            if (playDetails != null && playDetails.size() > 0) {


                for (Object[] obj : playDetails) {
                    PlayDetails playDet = new PlayDetails();
                    playDet.setId((BigInteger)obj[0]);
                    playDet.setName((String) obj[1]);
                    playDet.setPlayCount((BigInteger)obj[2]);
                    playDetailsNew.add(playDet);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return playDetailsNew;
    }
}
