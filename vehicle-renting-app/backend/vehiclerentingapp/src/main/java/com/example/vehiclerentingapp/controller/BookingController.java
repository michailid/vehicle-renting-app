package com.example.vehiclerentingapp.controller;

import com.example.vehiclerentingapp.model.Booking;
import com.example.vehiclerentingapp.model.Customer;
import com.example.vehiclerentingapp.repository.BookingRepository;
import com.example.vehiclerentingapp.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {
    private final BookingRepository bookingRepository;

    private final CustomerRepository customerRepository;

    public BookingController(BookingRepository bookingRepository, CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking createNewBooking(@RequestBody Booking booking) {
        // take the first customer from the found ones
        Customer customer = customerRepository.findByCustomerNameAndCustomerCity(booking.getCustomerName(), booking.getCustomerCity()).get(0);
        booking.setCustomer(customer);
        booking.setBookingId(null);
        customer.addBooking(booking);

        return bookingRepository.save(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBookingById(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
