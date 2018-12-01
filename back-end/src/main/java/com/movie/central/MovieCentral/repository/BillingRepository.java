package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long>, JpaSpecificationExecutor<Billing>{

    List<Billing> findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(SubscriptionType type, LocalDateTime startDateTime, LocalDateTime endTime);

    List<Billing> findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(SubscriptionType type1, SubscriptionType type2, LocalDateTime startDateTime, LocalDateTime endTime);

    @Query(value = "select p.customer_id, m.name, count(p.customer_id) as playcount from play_history p, customer m where p.customer_id = m.id group by customer_id order by playcount limit 10", nativeQuery = true)
    List<Object[]> getMostActiveCustomers();
}
