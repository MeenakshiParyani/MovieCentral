package com.movie.central.MovieCentral.model;

import com.movie.central.MovieCentral.enums.AuthType;
import com.movie.central.MovieCentral.enums.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customer")
@Getter @Setter @NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="screen_name")
    private String screenName;


    @Column(name="password")
    private String password;

    @Column(name="auth_type", nullable = false)
    private AuthType authType;

    @Column(name="subscription_start_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date subscriptionStartTime;

    @Column(name="subscription_end_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date subscriptionENDTime;

    @Column(name="user_role")
    private UserRole userRole;

    @Column(name="is_account_verified")
    private Boolean isAccountVerified;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="rating_id")
    private List<CustomerRating> ratings;


}
