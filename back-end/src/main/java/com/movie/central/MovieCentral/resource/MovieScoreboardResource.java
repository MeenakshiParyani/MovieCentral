package com.movie.central.MovieCentral.resource;

import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.service.MovieScoreboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movie/scoreboard")
public class MovieScoreboardResource {

    @Autowired
    MovieScoreboardService movieScoreboardService;

    @RequestMapping(value = "/highlyRatedMovies", method = RequestMethod.POST)
    public ResponseEntity<?> getMostHighlyRatedMoviesInGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Movie> highlyRatedMoviesInGivenMonth = movieScoreboardService.getMostHighlyRatedMoviesInGivenMonth(month, year);
        Map<String, List<Movie>> response = new HashMap<>();
        response.put("result", highlyRatedMoviesInGivenMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/mostPopularMovies", method = RequestMethod.POST)
    public ResponseEntity<?> getMostPopularMoviesInGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Movie> highlyRatedMoviesInGivenMonth = movieScoreboardService.getMostPopularMoviesInGivenMonth(month, year);
        Map<String, List<Movie>> response = new HashMap<>();
        response.put("result", highlyRatedMoviesInGivenMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

}
