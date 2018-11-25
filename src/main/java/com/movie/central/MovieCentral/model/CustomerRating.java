package com.movie.central.MovieCentral.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "customer_rating")
@Getter @Setter @NoArgsConstructor
public class CustomerRating implements Serializable{

//    TODO - check cascade types and generated type

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="customer_id")
    Customer customer;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="movie_id")
    Movie movie;

    @Column(name="rating")
    private Integer rating;

    @Column(name="rating_comment")
    private String ratingComment;



}
