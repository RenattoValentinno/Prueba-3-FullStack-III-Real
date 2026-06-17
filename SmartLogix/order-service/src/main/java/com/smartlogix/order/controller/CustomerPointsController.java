package com.smartlogix.order.controller;

import com.smartlogix.order.model.CustomerPoints;
import com.smartlogix.order.repository.CustomerPointsRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/points")
@CrossOrigin("*")
public class CustomerPointsController {

    private final CustomerPointsRepository repo;

    public CustomerPointsController(CustomerPointsRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{email}")
    public CustomerPoints getPoints(@PathVariable String email) {
        // Busca los puntos del email. Si no existe, devuelve 0 puntos.
        return repo.findById(email).orElse(new CustomerPoints(email, 0));
    }

    @GetMapping
    public List<CustomerPoints> getAllPoints() {
        return repo.findAll();
    }
}