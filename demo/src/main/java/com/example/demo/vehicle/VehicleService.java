package com.example.demo.vehicle;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long vehicleId) {
        if (vehicleId <= 0) {
            throw new IllegalStateException("The given id is less than zero!");
        }

        boolean exists  =  vehicleRepository.existsById(vehicleId);

        if(!exists) {
            throw new IllegalStateException("Cannot find a vehicle with a specific Id!");
        }

        return vehicleRepository.findById(vehicleId);
    }

    public void addNewVehicle (Vehicle newVehicle) {

        if(newVehicle.getBrand() == null || newVehicle.getType() == null) {
            throw new IllegalStateException("The brand and the type should not be null!");
        }

        //System.out.println(newVehicle.getConYear());
        //System.out.println(newVehicle.getBrand());
        /*if(LocalDate.now().isBefore(newVehicle.getConYear())) {
            throw new IllegalStateException("The construction year must be valid!");
        }*/

        vehicleRepository.save(newVehicle);
    }

    public void deleteVehicle(Long vehicleId) {
        if (vehicleId <= 0) {
            throw new IllegalStateException("The given id is less than zero!");
        }

        boolean exists  =  vehicleRepository.existsById(vehicleId);

        if(!exists) {
            throw new IllegalStateException("Cannot find a vehicle with a specific Id!");
        }

        vehicleRepository.deleteById(vehicleId);
    }

    @Transactional
    public void updateVehicle(Long vehicleId, Vehicle newVehicle) {
        if (vehicleId <= 0) {
            throw new IllegalStateException("The given id is less than zero!");
        }

        Vehicle actualVehicle  =  vehicleRepository.findById(vehicleId).orElseThrow(() -> new IllegalStateException("Vehicle with id " + vehicleId + "doesn't exists"));

        if(newVehicle.getBrand() == null || newVehicle.getType() == null || newVehicle.getBrand().isEmpty() || newVehicle.getType().isEmpty()) {
            throw new IllegalStateException("The brand and the type should not be null!");
        }

        actualVehicle.setBrand(newVehicle.getBrand());
        actualVehicle.setType(newVehicle.getType());
        actualVehicle.setConYear(newVehicle.getConYear());
    }

    public List<Vehicle> getAllVehiclesByBrand (String brand) {
        return vehicleRepository.findVehiclesByBrand(brand);
    }
}
