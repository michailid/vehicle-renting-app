package com.example.vehiclerentingapp.repository;

import com.example.vehiclerentingapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
