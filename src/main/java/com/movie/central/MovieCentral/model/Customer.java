package com.movie.central.MovieCentral.model;

import com.movie.central.MovieCentral.enums.AuthType;
import com.movie.central.MovieCentral.enums.UserRole;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customer")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Customer implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false, unique = true)
    private String email;

    @Column(name="screen_name")
    private String screenName;


    @Column(name="password")
    private String password;

    @Column(name="auth_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AuthType authType;

//    @Column(name="subscription_start_time")
//    private LocalDateTime subscriptionStartTime;

    @Column(name="subscription_end_time")
    private LocalDateTime subscriptionEndTime;

    @Column(name="user_role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name="is_account_verified", columnDefinition = "tinyint(1) default 0")
    private boolean isAccountVerified;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    @JoinColumn(name="rating_id")
    private List<CustomerRating> ratings;


}

