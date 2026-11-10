package com.example.vehiclerentingapp.repository;

import com.example.vehiclerentingapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByCustomerNameAndCustomerCity(String customerName, String customerCity);
}
