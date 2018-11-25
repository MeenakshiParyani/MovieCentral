package com.movie.central.MovieCentral.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.central.MovieCentral.enums.Genre;
import com.movie.central.MovieCentral.enums.MovieType;
import com.movie.central.MovieCentral.enums.MpaaRating;
import com.movie.central.MovieCentral.model.Actor;
import com.movie.central.MovieCentral.model.Director;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.*;


@RestController
@RequestMapping("/api/movie")
public class MovieResource {

    @Autowired
    MovieService movieService;

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<?> searchMovies(@RequestParam String searchString, HttpSession session) throws Exception{
        String[] keywords = searchString.split(" ");
        Set<Movie> movies = movieService.filterMoviesByKeywords(keywords);
        Actor actor1 = new Actor("Deepika Padukone");
        Actor actor2 = new Actor("Ranveer Singh");
        List<Actor> actors = new ArrayList<>(Arrays.asList(actor1,actor2));
        Director director = new Director("Sanjay Leela Bhansali");
        Movie movie = Movie.builder().title("Ramleela").synopsys("jjjj").country("USA").averageRating(3.5)
                .director(null).actors(null).genre(Genre.DRAMA).imageUrl("").movieUrl("").mpaaRating(MpaaRating.G)
                .price(0.0).releaseYear(2015).studio("abc").type(MovieType.FREE).actors(actors).director(director)
                .genre(Genre.DRAMA).build();
            Map<String,Set<Movie>> response = new HashMap<>();
        response.put("result" , movies);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }
}
