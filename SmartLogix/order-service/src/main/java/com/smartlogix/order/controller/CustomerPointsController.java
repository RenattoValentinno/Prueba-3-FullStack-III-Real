package com.smartlogix.order.controller;

// ¡Asegúrate de tener estos imports!
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.smartlogix.order.service.PointsFileService;
import com.smartlogix.order.dto.CustomerPointsDTO;

@RestController
@RequestMapping("/api/points")
public class CustomerPointsController {

    private final PointsFileService pointsFileService;

    public CustomerPointsController(PointsFileService pointsFileService) {
        this.pointsFileService = pointsFileService;
    }

    @GetMapping
    public List<CustomerPointsDTO> getAllPoints() {
        return pointsFileService.getAll();
    }
}