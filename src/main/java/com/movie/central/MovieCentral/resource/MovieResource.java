package com.movie.central.MovieCentral.resource;

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

}
