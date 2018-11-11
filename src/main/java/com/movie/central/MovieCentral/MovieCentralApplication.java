package com.movie.central.MovieCentral;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com/movie/central/MovieCentral/model")
public class MovieCentralApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieCentralApplication.class, args);
	}
}
