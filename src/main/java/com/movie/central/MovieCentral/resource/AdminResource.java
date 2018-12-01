package com.movie.central.MovieCentral.resource;

import com.movie.central.MovieCentral.enums.AuthType;
import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.model.Billing;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.response.Response;
import com.movie.central.MovieCentral.service.CustomerService;
import com.movie.central.MovieCentral.service.FinancialReportService;
import javafx.beans.binding.IntegerBinding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
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
    public ResponseEntity<?> getUniqueSubscription(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> subscriptionList = financialReportService.getUniqueSubscription(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", subscriptionList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/uniquePayperview", method = RequestMethod.POST)
    public ResponseEntity<?> getUniquePayperview(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> payperviewList = financialReportService.getUniquePayPerView(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", payperviewList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/uniqueAll", method = RequestMethod.POST)
    public ResponseEntity<?> getUniqueAll(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> allList = financialReportService.getUniqueAll(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", allList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/subscriptionsIncome", method = RequestMethod.POST)
    public ResponseEntity<?> getSubscriptionIncome(@RequestBody Map<String, String> input , HttpSession session) throws Exception {
        int month = Integer.valueOf(input.get("month"));
        int year = Integer.valueOf(input.get("year"));
        List<Billing> subscriptionList = financialReportService.getSubscriptionIncome(month, year);
        Map<String, List<Billing>> response = new HashMap<>();
        response.put("result", subscriptionList);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }
//    @RequestMapping(value = "/uniquePayperview", method = RequestMethod.GET)
//    public ResponseEntity<?> getUniquePayperview( HttpSession session) throws Exception {
//        List<Billing> payperviewList = financialReportService.getUniquePayPerView();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", payperviewList);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/allSubscription", method = RequestMethod.GET)
//    public ResponseEntity<?> getUniqueAll( HttpSession session) throws Exception {
//        List<Billing> allList = financialReportService.getUniqueAll();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", allList);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/subscriptionIncome", method = RequestMethod.GET)
//    public ResponseEntity<?> getSubscriptionIncome( HttpSession session) throws Exception {
//        List<Billing> subscriptionIncome = financialReportService.getSubscriptionIncome();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", subscriptionIncome);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/payperviewIncome", method = RequestMethod.GET)
//    public ResponseEntity<?> getPayperviewIncome( HttpSession session) throws Exception {
//        List<Billing> payperviewIncome = financialReportService.getSubscriptionIncome();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", payperviewIncome);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/totalIncome", method = RequestMethod.GET)
//    public ResponseEntity<?> getTotalIncome( HttpSession session) throws Exception {
//        List<Billing> totalIncome = financialReportService.getSubscriptionIncome();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", totalIncome);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/active", method = RequestMethod.GET)
//    public ResponseEntity<?> getActive( HttpSession session) throws Exception {
//        List<Billing> active = financialReportService.getActive();
//        Map<String, List<Billing>> response = new HashMap<>();
//        response.put("result", active);
//        return new ResponseEntity<Object>(response, HttpStatus.OK);
//    }

}

