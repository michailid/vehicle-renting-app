package com.example.vehiclerentingapp.model;

import jakarta.persistence.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
public class Booking {
    @ManyToOne
    @JoinColumn(
            name = "customer_id"
    )
    private Customer customer;

    private String customerName;

    private String customerCity;

    private String mobileNo;

    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Long carId;

    private String bookingDate;

    private Long discount;

    private Long totalBillAmount;

    private String bookingUid;

    private String brand;

    private String model;

    public Booking() {
    }

    public Booking(String customerName, String customerCity, String mobileNo, String email, Long bookingId, Long carId, String bookingDate, Long discount, Long totalBillAmount, String bookingUid, String brand, String model) {
        this.customerName = customerName;
        this.customerCity = customerCity;
        this.mobileNo = mobileNo;
        this.email = email;
        this.bookingId = bookingId;
        this.carId = carId;
        this.bookingDate = bookingDate;
        this.discount = discount;
        this.totalBillAmount = totalBillAmount;
        this.bookingUid = bookingUid;
        this.brand = brand;
        this.model = model;
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

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Long getDiscount() {
        return discount;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    public Long getTotalBillAmount() {
        return totalBillAmount;
    }

    public void setTotalBillAmount(Long totalBillAmount) {
        this.totalBillAmount = totalBillAmount;
    }

    public String getBookingUid() {
        return bookingUid;
    }

    public void setBookingUid(String bookingUid) {
        this.bookingUid = bookingUid;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
