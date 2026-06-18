package com.smartlogix.order.model;

import jakarta.persistence.*; // ✅ ESTA ES LA VERSIÓN CORRECTA

@Entity
public class AdminConfig {
    @Id
    private String id = "CONFIG"; // Esto asegura que siempre haya un solo registro
    private int cantidadPaso = 15;
    private double porcentajeDescuento = 0.05;
    private int puntosPorMil = 1;

    // Constructor vacío requerido por JPA
    public AdminConfig() {}

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getCantidadPaso() { return cantidadPaso; }
    public void setCantidadPaso(int cantidadPaso) { this.cantidadPaso = cantidadPaso; }

    public double getPorcentajeDescuento() { return porcentajeDescuento; }
    public void setPorcentajeDescuento(double porcentajeDescuento) { this.porcentajeDescuento = porcentajeDescuento; }

    public int getPuntosPorMil() { return puntosPorMil; }
    public void setPuntosPorMil(int puntosPorMil) { this.puntosPorMil = puntosPorMil; }
}