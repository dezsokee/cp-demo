package com.example.demo.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/vehicle")
@CrossOrigin("*")
public class VehicleController {

    private final VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping(path = "vehicles")
    public List<Vehicle> getVehicles() {
        return vehicleService.getVehicles();
    }

    @GetMapping(path = "{vehicleId}")
    public Optional<Vehicle> getVehicleById (@PathVariable("vehicleId") Long vehicleId) {
        return vehicleService.getVehicleById(vehicleId);
    }

    @PostMapping(path = "addNewVehicle")
    public void addNewVehicle (@RequestBody Vehicle newVehicle) {
        vehicleService.addNewVehicle(newVehicle);

    }

    @DeleteMapping(path = "delete/{vehicleId}")
    public void deleteVehicle (@PathVariable("vehicleId") Long vehicleId) {
        vehicleService.deleteVehicle(vehicleId);
    }

    @PutMapping(path = "update/{vehicleId}")
    public void updateVehicle (@PathVariable("vehicleId") Long vehicleId, @RequestBody Vehicle newVehicle) {
        vehicleService.updateVehicle(vehicleId, newVehicle);
    }

    @GetMapping(path = "brand/{brandName}")
    public List<Vehicle> getAllVehiclesByBrand(@PathVariable("brandName") String brand) {
        return vehicleService.getAllVehiclesByBrand(brand);
    }
}
