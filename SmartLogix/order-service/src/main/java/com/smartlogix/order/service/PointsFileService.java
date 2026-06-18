package com.smartlogix.order.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartlogix.order.dto.CustomerPointsDTO;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class PointsFileService {

    private final ObjectMapper mapper = new ObjectMapper();

    private File getFile() throws Exception {
        return new ClassPathResource("points.json").getFile();
    }

    public List<CustomerPointsDTO> getAll() {
        try {
            File file = getFile();

            if (!file.exists()) {
                return new ArrayList<>();
            }

            return mapper.readValue(
                    file,
                    new TypeReference<List<CustomerPointsDTO>>() {}
            );

        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public void saveAll(List<CustomerPointsDTO> points) {
        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(getFile(), points);
        } catch (Exception ignored) {
        }
    }
}