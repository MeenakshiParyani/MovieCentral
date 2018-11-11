package model;


import enums.Genre;
import enums.MpaaRating;
import enums.MovieType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "movie")
@Getter @Setter @NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="genre", nullable = false)
    private Genre genre;

    @Column(name="release_year", nullable = false)
    private Integer releaseYear;

    @Column(name="studio", nullable = false)
    private String studio;

    @Column(name="synopsys", nullable = false)
    private String synopsys;

    @Column(name="image_url", nullable = false)
    private String imageUrl;

    @Column(name="movie_url", nullable = false)
    private String movieUrl;

    @Column(name="country", nullable = false)
    private String country;

    @Column(name="average_rating", nullable = false)
    private Double averageRating;

    @Column(name="type", nullable = false)
    private MovieType type;

    @Column(name="price", nullable = false)
    private Double price;

    @Column(name="mpaa_rating", nullable = false)
    private MpaaRating mpaaRating;

    @ManyToMany
    @JoinTable(name="movie_actor",
            joinColumns = { @JoinColumn(name="MOVIE_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name="ACTOR_ID", referencedColumnName = "ID")})
    private List<Actor> actors;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="director_id")
    private Director director;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="rating_id")
    private List<CustomerRating> ratings;






}
