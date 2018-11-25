package com.movie.central.MovieCentral.data;

import com.movie.central.MovieCentral.enums.Genre;
import com.movie.central.MovieCentral.enums.MovieType;
import com.movie.central.MovieCentral.enums.MpaaRating;
import com.movie.central.MovieCentral.model.Actor;
import com.movie.central.MovieCentral.model.Director;
import com.movie.central.MovieCentral.model.Movie;
import com.movie.central.MovieCentral.repository.ActorRepository;
import com.movie.central.MovieCentral.repository.DirectorRepository;
import com.movie.central.MovieCentral.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SampleData implements ApplicationRunner {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private ActorRepository actorRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        saveMovie1();
        saveMovie2();
        saveMovie3();
        saveMovie4();
    }

    public void saveMovie1(){
        Director director = new Director("Sanjay Leela Bhansali");
        directorRepository.save(director);

        Actor actor1 = new Actor("Deepika Padukone");
        Actor actor2 = new Actor("Ranveer Singh");
        actorRepository.save(actor1);
        actorRepository.save(actor2);
        List<Actor> actors = new ArrayList<>(Arrays.asList(actor1,actor2));

        String synopsys = "A man (Ranveer Singh) from a crime family falls in love with a woman (Deepika Padukone) who is resistant to her family's choice of a husband for her.";


        movieRepository.save(Movie.builder().title("Ramleela").synopsys(synopsys).country("India").averageRating(3.5)
                .director(director).actors(actors).genre(Genre.DRAMA).imageUrl("").movieUrl("").mpaaRating(MpaaRating.G)
                .price(0.0).releaseYear(2015).studio("abc").type(MovieType.FREE).build());
    }

    public void saveMovie2(){
        Director director = new Director("Madhur Bhandarkar");
        directorRepository.save(director);

        Actor actor1 = new Actor("Priyanka Chopra");
        Actor actor2 = new Actor("Kangna Ranawat");
        Actor actor3 = new Actor("Mugdha Godse");
        actorRepository.save(actor1);
        actorRepository.save(actor2);
        actorRepository.save(actor3);
        List<Actor> actors = new ArrayList<>(Arrays.asList(actor1,actor2, actor3));

        String synopsys = "Meghna (Priyanka Chopra) has always dreamed of getting out of her small Indian town and making it in the world of high fashion, but her parents have different ideas for her future. When she wins a local pageant, though, she picks up and moves to Mumbai to try to turn her dreams into reality. Although she initially finds success with modeling, she slips up when she gets impregnated by her married boss. Scared and alone, she must then decide if it is time to leave the big city.";


        movieRepository.save(Movie.builder().title("Fashion").synopsys(synopsys).country("India").averageRating(4.5)
                .director(director).actors(actors).genre(Genre.DRAMA).imageUrl("").movieUrl("").mpaaRating(MpaaRating.PG)
                .price(0.0).releaseYear(2008).studio("def").type(MovieType.FREE).build());
    }

    public void saveMovie3(){
        Director director = new Director("Ayan Mukerji");
        directorRepository.save(director);

        Actor actor1 = actorRepository.findOneByName("Deepika Padukone");
        Actor actor2 = new Actor("Ranbir Kapoor");
        actorRepository.save(actor1);
        actorRepository.save(actor2);
        List<Actor> actors = new ArrayList<>(Arrays.asList(actor1,actor2));

        String synopsys = "Bunny (Ranbir Kapoor) and Naina (Deepika Padukone) meet when they graduate from college and again in their late 20s.";


        movieRepository.save(Movie.builder().title("Yeh Jawaani Hai Deewani").synopsys(synopsys).country("India").averageRating(4.0)
                .director(director).actors(actors).genre(Genre.COMEDY).imageUrl("").movieUrl("").mpaaRating(MpaaRating.PG_13)
                .price(0.0).releaseYear(2013).studio("geh").type(MovieType.FREE).build());
    }


    public void saveMovie4(){
        Director director = new Director("James Cameron");
        directorRepository.save(director);

        Actor actor1 = new Actor("Leonardo DiCaprio");
        Actor actor2 = new Actor("Kate Winslet");
        Actor actor3 = new Actor("Billy Zane ");
        actorRepository.save(actor1);
        actorRepository.save(actor2);
        actorRepository.save(actor3);
        List<Actor> actors = new ArrayList<>(Arrays.asList(actor1,actor2,actor3));

        String synopsys = "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.";


        movieRepository.save(Movie.builder().title("Titanic").synopsys(synopsys).country("USA").averageRating(4.0)
                .director(director).actors(actors).genre(Genre.ADVENTURE).imageUrl("").movieUrl("").mpaaRating(MpaaRating.PG_13)
                .price(0.0).releaseYear(1997).studio("Hollywood").type(MovieType.FREE).build());

    }
}
