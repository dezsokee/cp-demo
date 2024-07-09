package com.example.demo.vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository <Vehicle, Long> {

    @Query("SELECT v FROM vehicle v WHERE v.brand = ?1")
    List<Vehicle> findVehiclesByBrand(String brand);
}
