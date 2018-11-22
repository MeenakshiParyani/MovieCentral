package com.movie.central.MovieCentral.service;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.enums.UserRole;
import com.movie.central.MovieCentral.exceptions.Error;
import com.movie.central.MovieCentral.exceptions.MovieCentralException;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.repository.BillingRepository;
import com.movie.central.MovieCentral.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    private BillingRepository billingRepository;

    public void register(Customer customer) throws Exception {
        customer.setUserRole(UserRole.CUSTOMER);
        customerRepository.save(customer);
    }

    private LocalDateTime getSubscriptionEndDate(LocalDateTime startTime, Integer months) {
        LocalDateTime endDate = startTime.plusMonths(months).withHour(0).withMinute(0).withSecond(0).withNano(0);
        System.out.println(endDate + " " + ZoneId.systemDefault());
        return endDate;
    }

    // TODO - Apply aspect to change customer subscription end date
    public void subscribe(Long customerId, Integer months, Double totalAmount) throws Exception{
        Optional<Customer> customer = customerRepository.findById(customerId);
        if(customer.isPresent()){
                Customer c = customer.get();
                LocalDateTime startTime = LocalDateTime.now(ZoneId.systemDefault());
                LocalDateTime endTime = getSubscriptionEndDate(startTime, months).withHour(0).withMinute(0).withSecond(0);
                c.setSubscriptionEndTime(endTime);
                Billing userBilling = Billing.builder().customer(c).endTime(endTime).totalAmount(totalAmount).
                        startTime(startTime).subscriptionType(SubscriptionType.SUBSCRIPTION).build();
                billingRepository.save(userBilling);
                customerRepository.save(c);
        }else{
            throw new MovieCentralException(Error.USER_NOT_FOUND);
        }

    }

    public LocalDateTime getBillingStatus(Long customerId) throws Exception{
        Optional<Customer> customer = customerRepository.findById(customerId);
       if(customer.isPresent()){
           return customer.get().getSubscriptionEndTime();
       }else{
           throw new MovieCentralException(Error.USER_NOT_FOUND);
       }
    }

}
