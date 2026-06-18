package com.smartlogix.order.dto;

public class CustomerPointsDTO {

    private String username;
    private String customerEmail;
    private int points;

    public CustomerPointsDTO() {
    }

    public CustomerPointsDTO(String username, String customerEmail, int points) {
        this.username = username;
        this.customerEmail = customerEmail;
        this.points = points;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}