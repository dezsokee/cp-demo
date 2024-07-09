package com.example.demo.vehicle;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;

import static jakarta.persistence.GenerationType.*;

@Entity(name = "vehicle")
@Table
public class Vehicle {

    @Id
    @SequenceGenerator(
            name = "vehicle_id_sequence",
            sequenceName = "vehicle_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "vehicle_id_sequence"
    )

    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "brand",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String brand;

    @Column(
            name = "type",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String type;

    @Column(
            name = "constructionYear",
            nullable = false
    )
    private LocalDate conYear;
    @Transient
    private Integer age;

    public Vehicle() {
    }

    public Vehicle(Long id, String brand, String type, LocalDate conYear) {
        this.id = id;
        this.brand = brand;
        this.type = type;
        this.conYear = conYear;
    }

    public Vehicle(String brand, String type, LocalDate conYear) {
        this.brand = brand;
        this.type = type;
        this.conYear = conYear;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getConYear() {
        return conYear;
    }

    public void setConYear(LocalDate conYear) {
        this.conYear = conYear;
    }

    public int getAge() {
        return Period.between(this.conYear, LocalDate.now()).getYears();
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", type='" + type + '\'' +
                ", conYear=" + conYear +
                ", age=" + age +
                '}';
    }
}
