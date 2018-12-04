package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.enums.UserRole;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.PlayHistory;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.repository.BillingRepository;
import com.movie.central.MovieCentral.repository.CustomerRepository;
import com.movie.central.MovieCentral.repository.PlayHistoryRepository;
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

    @Autowired
    private PlayHistoryRepository playHistoryRepository;

    private LocalDateTime getFirstDayOfGivenMonth(int month, int year) {
        LocalDateTime startDateTime = LocalDateTime.now(ZoneId.systemDefault()).withMonth(month).withYear(year).withHour(0).withMinute(0).withSecond(0).withNano(0);
        startDateTime = startDateTime.with(TemporalAdjusters.firstDayOfMonth());
        return startDateTime;
    }

    private LocalDateTime getLastDayOfGivenMonth(LocalDateTime startDateTime) {
        LocalDateTime endDateTime = startDateTime.withHour(23).withMinute(59).withSecond(59);
        endDateTime = endDateTime.with(TemporalAdjusters.lastDayOfMonth());
        return endDateTime;
    }


    public List<Billing> getUniqueSubscriptionGivenMonth(int month, int year) throws Exception {
        LocalDateTime startDateTime = getFirstDayOfGivenMonth(month, year);

        LocalDateTime endDateTime = getLastDayOfGivenMonth(startDateTime);

        List<Billing> subscriptionList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual( SubscriptionType.SUBSCRIPTION, startDateTime, endDateTime);
        return subscriptionList;
    }

    public List<Billing> getUniquePayPerViewGivenMonth(int month, int year) throws Exception {
        LocalDateTime startDateTime = getFirstDayOfGivenMonth(month, year);

        LocalDateTime endDateTime = getLastDayOfGivenMonth(startDateTime);

        List<Billing> payPerViewList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual( SubscriptionType.PAY_PER_VIEW, startDateTime, endDateTime);
        return payPerViewList;
    }

    public List<Customer> getAllUniqueRegisteredUsersGivenMonth(int month, int year) throws Exception {
        LocalDateTime startDateTime = getFirstDayOfGivenMonth(month, year);

        LocalDateTime endDateTime = getLastDayOfGivenMonth(startDateTime);

        List<Customer> allList = customerRepository.findDistinctByRegistrationDateTimeGreaterThanEqualAndRegistrationDateTimeLessThanEqual
                (startDateTime, endDateTime);
        return allList;
    }

    public Double getSubscriptionOrPayPerViewIncome(int month, int year, SubscriptionType subscriptionType) throws Exception {
        LocalDateTime startDateTime = getFirstDayOfGivenMonth(month, year);
        LocalDateTime endDateTime = getLastDayOfGivenMonth(startDateTime);

        List<Billing> subscriptionList = billingRepository.findDistinctBySubscriptionTypeAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(subscriptionType, startDateTime, endDateTime);
        Double income = subscriptionList.stream().mapToDouble(sub -> sub.getTotalAmount()).sum();
        return income;
    }

    public Long getAllUniqueActiveUsers(int month, int year){
        LocalDateTime startDateTime = getFirstDayOfGivenMonth(month, year);
        LocalDateTime endDateTime = getLastDayOfGivenMonth(startDateTime);

        Long uniqueActiveUsers = playHistoryRepository.getActiveCustomersByPlayTime(startDateTime, endDateTime);
        return uniqueActiveUsers == null ? 0 : uniqueActiveUsers;
    }
}