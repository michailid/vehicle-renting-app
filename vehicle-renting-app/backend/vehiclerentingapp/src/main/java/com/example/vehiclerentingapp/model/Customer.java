package com.example.vehiclerentingapp.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String customerName;

    private String customerCity;

    private String mobileNo;

    private String email;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL
    )
    private List<Booking> bookings = new ArrayList<>();

    public Customer() {
    }

    public Customer(Long customerId, String customerName, String customerCity, String mobileNo, String email) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerCity = customerCity;
        this.mobileNo = mobileNo;
        this.email = email;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCity() {
        return customerCity;
    }

    public void setCustomerCity(String customerCity) {
        this.customerCity = customerCity;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addBooking(Booking booking) {
        bookings.add(booking);
    }
}
