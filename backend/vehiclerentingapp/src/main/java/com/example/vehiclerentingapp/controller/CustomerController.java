package com.example.vehiclerentingapp.controller;

import com.example.vehiclerentingapp.model.Customer;
import com.example.vehiclerentingapp.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping
    public Customer createNewCustomer(@RequestBody Customer customer) {
        customer.setCustomerId(null);
        return customerRepository.save(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer editedCustomer) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setCustomerName(editedCustomer.getCustomerName());
        customer.setCustomerCity(editedCustomer.getCustomerCity());
        customer.setMobileNo(editedCustomer.getMobileNo());
        customer.setEmail(editedCustomer.getEmail());

        return customerRepository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomerById(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }
}
