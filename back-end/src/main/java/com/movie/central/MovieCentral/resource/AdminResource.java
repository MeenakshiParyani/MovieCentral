package com.movie.central.MovieCentral.resource;

import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.service.CustomerService;
import com.movie.central.MovieCentral.service.FinancialReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RequestMapping("/api/admin/")
@RestController
public class AdminResource {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private FinancialReportService financialReportService;

    @RequestMapping(value = "/uniqueSubscriptions", method = RequestMethod.POST)
    public ResponseEntity<?> getUniqueSubscriptionUsersPerMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> subscriptionList = financialReportService.getUniqueSubscriptionGivenMonth(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", subscriptionList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/uniquePayPerView", method = RequestMethod.POST)
    public ResponseEntity<?> getUniquePayPerViewUsersPerMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> payperviewList = financialReportService.getUniquePayPerViewGivenMonth(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", payperviewList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/allUniqueUsers", method = RequestMethod.POST)
    public ResponseEntity<?> getAllUniqueCustomersForGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Customer> allList = financialReportService.getAllUniqueRegisteredUsersGivenMonth(month, year);
        Map<String, List<Customer>> response = new HashMap<>();
        response.put("result", allList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/subscriptionIncome", method = RequestMethod.POST)
    public ResponseEntity<?> getSubscriptionIncomeGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        Double subscriptionIncomeForMonth = financialReportService.getSubscriptionOrPayPerViewIncome(month, year, SubscriptionType.SUBSCRIPTION);
        Map<String, Double> response = new HashMap<>();
        response.put("result", subscriptionIncomeForMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }


    @RequestMapping(value = "/payPerViewIncome", method = RequestMethod.POST)
    public ResponseEntity<?> getPayPerViewIncomeGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        Double payPerViewIncomePerMonth = financialReportService.getSubscriptionOrPayPerViewIncome(month, year, SubscriptionType.PAY_PER_VIEW);
        Map<String, Double> response = new HashMap<>();
        response.put("result", payPerViewIncomePerMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/totalIncome", method = RequestMethod.POST)
    public ResponseEntity<?> getTotalIncomeGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        Double subscriptionIncomeForMonth = financialReportService.getSubscriptionOrPayPerViewIncome(month, year, SubscriptionType.SUBSCRIPTION);
        Double payPerViewIncomePerMonth = financialReportService.getSubscriptionOrPayPerViewIncome(month, year, SubscriptionType.PAY_PER_VIEW);
        Map<String, Double> response = new HashMap<>();
        response.put("result", subscriptionIncomeForMonth + payPerViewIncomePerMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/uniqueActiveUsers", method = RequestMethod.POST)
    public ResponseEntity<?> getUniqueActiveUsersGivenMonth(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        Long activeUsersPerMonth = financialReportService.getAllUniqueActiveUsers(month, year);
        Map<String, Long> response = new HashMap<>();
        response.put("result", activeUsersPerMonth);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

}

