package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.enums.UserRole;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.PlayHistory;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.repository.BillingRepository;
import com.movie.central.MovieCentral.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.Optional;
import java.util.List;

@Service
public class FinancialReportService {

    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    private BillingRepository billingRepository;


    public List<Billing> getUniqueSubscription(int month, int year) throws Exception {
        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault()).withMonth(month).withYear(year).withHour(0).withMinute(0).withSecond(0).withNano(0);
        startDateTime = startDateTime.with(TemporalAdjusters.firstDayOfMonth());

        LocalDateTime endDateTime = startDateTime.withHour(23).withMinute(59).withSecond(59);
        endDateTime = endDateTime.with(TemporalAdjusters.lastDayOfMonth());

        List<Billing> subscriptionList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual( SubscriptionType.SUBSCRIPTION, startDateTime, endDateTime);
        return subscriptionList;
    }

    public List<Billing> getUniquePayPerView(int month, int year) throws Exception {
        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault()).withMonth(month).withYear(year).withHour(0).withMinute(0).withSecond(0).withNano(0);
        startDateTime = startDateTime.with(TemporalAdjusters.firstDayOfMonth());

        LocalDateTime endDateTime = startDateTime.withHour(23).withMinute(59).withSecond(59);
        endDateTime = endDateTime.with(TemporalAdjusters.lastDayOfMonth());

        List<Billing> payperviewList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual( SubscriptionType.PAY_PER_VIEW, startDateTime, endDateTime);
        return payperviewList;
    }

    public List<Billing> getUniqueAll(int month, int year) throws Exception {
        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault()).withMonth(month).withYear(year).withHour(0).withMinute(0).withSecond(0).withNano(0);
        startDateTime = startDateTime.with(TemporalAdjusters.firstDayOfMonth());

        LocalDateTime endDateTime = startDateTime.withHour(23).withMinute(59).withSecond(59);
        endDateTime = endDateTime.with(TemporalAdjusters.lastDayOfMonth());

        List<Billing> allList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual( SubscriptionType.PAY_PER_VIEW, SubscriptionType.SUBSCRIPTION, startDateTime, endDateTime);
        return allList;
    }

    public List<Billing> getSubscriptionIncome(int month, int year) throws Exception {
        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault()).withMonth(month).withYear(year).withHour(0).withMinute(0).withSecond(0).withNano(0);
        startDateTime = startDateTime.with(TemporalAdjusters.firstDayOfMonth());

        LocalDateTime endDateTime = startDateTime.withHour(23).withMinute(59).withSecond(59);
        endDateTime = endDateTime.with(TemporalAdjusters.lastDayOfMonth());

        List<Billing> subscriptionList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(SubscriptionType.SUBSCRIPTION, startDateTime, endDateTime);
        return subscriptionList;
    }



//   public List<Billing> getUniquePayPerView() throws Exception {
//        List<Billing> payperviewList = billingRepository.findDistinctBySubscriptionTypePayPerViewAndAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return payperviewList;
//   }
//
//    public List<Billing> getUniqueAll() throws Exception {
//        List<Billing> allList = billingRepository.findDistinctBySubscriptionType_SubscriptionAndSubscriptionTypePayPerViewAndStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return allList;
//    }
//
//    public List<Billing> getSubscriptionIncome() throws Exception {
//        List<Billing> subscriptionIncome = billingRepository.findDistinctByTotalAmountAndStartTimeIsAfterAndEndTimeBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return subscriptionIncome;
//    }
//
//    public List<Billing> getPayperviewIncome() throws Exception {
//        List<Billing> payperviewIncome = billingRepository.findDistinctByStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return payperviewIncome;
//    }
//
//    public List<Billing> getTotalIncome() throws Exception {
//        List<Billing> totalIncome = billingRepository.findDistinctByStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return totalIncome;
//    }
//
//    public List<Billing> getActive() throws Exception {
//        List<Billing> active = billingRepository.findDistinctByStartTimeIsAfterAndEndTimeIsBefore(LocalDateTime startDateTime, LocalDateTime endLocalDateTime);
//        return active;
//    }





}