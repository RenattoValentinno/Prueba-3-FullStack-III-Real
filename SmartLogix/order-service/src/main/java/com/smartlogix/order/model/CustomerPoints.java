package com.smartlogix.order.model;

import jakarta.persistence.*;

@Entity
public class CustomerPoints {
    @Id
    private String id;
    private int points;

    // Constructor vacío (obligatorio para Spring/JPA)
    public CustomerPoints() {
    }

    // Constructor con parámetros
    public CustomerPoints(String id, int points) {
        this.id = id;
        this.points = points;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
}