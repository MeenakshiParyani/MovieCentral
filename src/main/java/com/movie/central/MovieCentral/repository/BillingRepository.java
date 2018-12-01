package com.movie.central.MovieCentral.repository;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.PlayHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long>, JpaSpecificationExecutor<Billing>{

//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndSubscriptionTypePayPerViewAndStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);

    List<Billing> findDistinctBySubscriptionTypeAndStartTimeIsAfterAndEndTimeIsBefore(SubscriptionType type, LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionTypePayPerViewAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_PayPerViewAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<Billing> findDistinctBySubscriptionType_SubscriptionAndSubscriptionTypePayPerViewAndTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//
//    List<PlayHistory> findDistinctBy
}
