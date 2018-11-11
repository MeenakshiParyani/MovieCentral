package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Integer> {

}
