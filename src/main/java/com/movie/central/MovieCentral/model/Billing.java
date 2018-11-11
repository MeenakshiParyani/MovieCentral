package com.movie.central.MovieCentral.model;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "billing")
@Getter @Setter @NoArgsConstructor
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="customer_id")
    Customer customer;

    @Column(name="billing_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date billingTime;

    @Column(name="price")
    private Double price;

    @Column(name="subscription_type", nullable = false)
    private SubscriptionType subscriptionType;


}
