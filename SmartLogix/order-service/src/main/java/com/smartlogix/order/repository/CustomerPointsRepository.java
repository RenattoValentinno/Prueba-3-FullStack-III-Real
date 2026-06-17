package com.smartlogix.order.repository;

import com.smartlogix.order.model.CustomerPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerPointsRepository extends JpaRepository<CustomerPoints, String> {
    // Esto le da a Spring los métodos para buscar y guardar puntos por email
}