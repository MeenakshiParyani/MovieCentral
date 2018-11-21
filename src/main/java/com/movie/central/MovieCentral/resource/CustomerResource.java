package com.movie.central.MovieCentral.resource;

import com.movie.central.MovieCentral.enums.AuthType;
import com.movie.central.MovieCentral.enums.SubscriptionType;
import com.movie.central.MovieCentral.exceptions.CustomerAlreadyExistsException;
import com.movie.central.MovieCentral.exceptions.InvalidSubscriptionMonthsException;
import com.movie.central.MovieCentral.model.Customer;
import com.movie.central.MovieCentral.response.Response;
import com.movie.central.MovieCentral.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RequestMapping("/api/customer")
@RestController
public class CustomerResource {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody Map<String, String> input, HttpSession session) throws Exception{

        try{
            String name = input.get("name");
            String email = input.get("email");
            String screenName = input.get("screenName");
            String password = input.get("password");
            AuthType authType = AuthType.getByName(input.get("authType"));
            Customer customer = Customer.builder().name(name).email(email).screenName(screenName)
                    .password(password).authType(authType).build();
            customerService.register(customer);
            Response response = new Response("Customer Registered Successfully", HttpStatus.CREATED);
            return new ResponseEntity(response, response.getStatus());
        }catch(DataIntegrityViolationException ex){
            throw new CustomerAlreadyExistsException();
        }

    }

    @RequestMapping(value = "/subscribe", method = RequestMethod.POST)
    public ResponseEntity<?> subscribe(@RequestBody Map<String,String> input, HttpSession session) throws Exception{
        Long customerId = Long.valueOf(input.get("customerId"));
        Integer noOfMonths = Integer.valueOf(input.get("months"));
        if(noOfMonths < 1)
            throw new InvalidSubscriptionMonthsException();
        Double price = Double.valueOf(input.get("price"));
        customerService.subscribe(customerId, noOfMonths,price);
        Response response = new Response("Subscription was successful", HttpStatus.OK);
        return new ResponseEntity(response, response.getStatus());
    }


}
