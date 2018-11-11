package model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "director")
@Getter @Setter @NoArgsConstructor
public class Director {

    @Id
    @Column(name="id")
    private Long id;

    @OneToMany(mappedBy = "director")
    private List<Movie> movies;

}
