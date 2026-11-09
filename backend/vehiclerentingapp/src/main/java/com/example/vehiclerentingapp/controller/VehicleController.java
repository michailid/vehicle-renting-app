package com.example.vehiclerentingapp.controller;

import com.example.vehiclerentingapp.model.Vehicle;
import com.example.vehiclerentingapp.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private final VehicleRepository vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }

    @PostMapping("/add")
    public Vehicle createNewVehicle(@RequestBody Vehicle vehicle) {
        vehicle.setCarId(null);
        return vehicleRepository.save(vehicle);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicleById(@PathVariable Long id) {
        vehicleRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle editedVehicle) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow();
        vehicle.setBrand(editedVehicle.getBrand());
        vehicle.setModel(editedVehicle.getModel());
        vehicle.setYear(editedVehicle.getYear());
        vehicle.setColor(editedVehicle.getColor());
        vehicle.setDailyRate(editedVehicle.getDailyRate());
        vehicle.setRegNo(editedVehicle.getRegNo());
        vehicle.setCarImage(editedVehicle.getCarImage());

        return vehicleRepository.save(vehicle);
    }
}
