package com.smartlogix.order.repository;

import com.smartlogix.order.model.AdminConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminConfigRepository extends JpaRepository<AdminConfig, String> {
    // Esta interfaz hereda automáticamente métodos como save(), findById(), etc.
}