package com.example.vehiclerentingapp.repository;

import com.example.vehiclerentingapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
