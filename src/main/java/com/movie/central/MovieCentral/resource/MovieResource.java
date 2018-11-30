package com.movie.central.MovieCentral.resource;

import com.movie.central.MovieCentral.model.CustomerRating;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.model.MovieFilter;
import com.movie.central.MovieCentral.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;


@RestController
@RequestMapping("/api/movie")
public class MovieResource {

    @Autowired
    MovieService movieService;

    @RequestMapping(value = "/searchAll", method = RequestMethod.GET)
    public ResponseEntity<?> searchAllMovies(HttpSession session) throws Exception {
        List<Movie> movies = new ArrayList<>(movieService.findAllMovies());
        Map<String, List<Movie>> response = new HashMap<>();
        response.put("result", movies);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }


    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public ResponseEntity<?> filterByAttributeAndOrKeywords(@RequestBody MovieFilter movieFilter, HttpSession session) throws Exception{
        List<Movie> movies = movieService.filterMoviesByMovieFilter(movieFilter);
        Map<String, List<Movie>> response = new HashMap<>();
        response.put("result", movies);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/review", method = RequestMethod.POST)
    public ResponseEntity<?> reviewMovie(@RequestBody Map<String,String> input, HttpSession session) throws Exception{
        Long customerId = Long.valueOf(input.get("customerId"));
        Long movieId = Long.valueOf(input.get("movieId"));
        Integer rating = Integer.valueOf(input.get("rating"));
        String ratingComment = input.get("comment");
        movieService.reviewMovie(customerId, movieId, rating, ratingComment);
        return new ResponseEntity<Object>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.GET)
    public ResponseEntity<?> getAllReviews(@RequestParam Long movieId, HttpSession session) throws Exception{
        List<CustomerRating> ratings = movieService.getAllMovieRatings(movieId);
        Map<String, List<CustomerRating>> response = new HashMap<>();
        response.put("result", ratings);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }


}
