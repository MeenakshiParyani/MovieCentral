package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.model.Actor;
import com.movie.central.MovieCentral.model.Director;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.repository.ActorRepository;
import com.movie.central.MovieCentral.repository.DirectorRepository;
import com.movie.central.MovieCentral.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    ActorRepository actorRepository;

    @Autowired
    DirectorRepository directorRepository;


    public Set<Movie> filterMoviesByKeywords(String[] keywords){
        Set<Movie> result = new HashSet<>();
        if(keywords.length<1)
            return result;
        result.addAll(findMoviesByKeyword(keywords[0]));

        for(int i=1; i<keywords.length; i++){
            result = getIntersection(result, findMoviesByKeyword(keywords[i]));
        }
        return result;
    }

    public Set<Movie> findMoviesByKeyword(String keyword){
        HashSet<Movie> result = new HashSet<>();
        result.addAll(movieRepository.findMoviesByAttributes(keyword, keyword, keyword, keyword, keyword, keyword));
        result.addAll(actorRepository.findMoviesByActor(keyword));
        result.addAll(directorRepository.findMoviesByDirector(keyword));
        return result;
    }

    public Set<Movie> getIntersection(Set<Movie> movies1, Set<Movie> movies2){
        movies1.retainAll(movies2);
        return movies1;
    }
}
