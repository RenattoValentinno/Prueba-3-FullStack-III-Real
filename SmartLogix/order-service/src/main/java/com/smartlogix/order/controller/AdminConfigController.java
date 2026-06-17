package com.smartlogix.order.controller;

import com.smartlogix.order.model.AdminConfig;
import com.smartlogix.order.repository.AdminConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/config")
public class AdminConfigController {

    @Autowired
    private AdminConfigRepository repo;

    @GetMapping
    public AdminConfig getConfig() {
        // Si no existe una configuración, crea una por defecto
        return repo.findById("CONFIG").orElse(new AdminConfig());
    }

    @PutMapping
    public AdminConfig updateConfig(@RequestBody AdminConfig config) {
        config.setId("CONFIG"); // Forzamos el ID para que siempre sobrescriba el mismo registro
        return repo.save(config);
    }
}