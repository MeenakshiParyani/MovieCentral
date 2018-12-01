package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.PlayHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long>, JpaSpecificationExecutor<Billing>{


//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndSubscriptionTypePayPerViewAndStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);

    List<Billing> findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(SubscriptionType type, LocalDateTime startDateTime, LocalDateTime endTime);

    List<Billing> findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(SubscriptionType type1, SubscriptionType type2, LocalDateTime startDateTime, LocalDateTime endTime);
//
//    List<Billing> findDistinctBySubscriptionTypePayPerViewAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_PayPerViewAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndSubscriptionTypePayPerViewAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//


//*Edit the following query to return the most active user*
    @Query(value = "select p.customer_id, m.name, count(p.customer_id) as playcount from play_history p, customer m where p.customer_id = m.id group by customer_id order by playcount limit 10", nativeQuery = true)
    List<Object[]> getMostActiveCustomers();
}
