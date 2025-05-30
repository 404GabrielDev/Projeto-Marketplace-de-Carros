package com.service.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDTO {
    private Long id;

    private String name;

    private String brand;

    private String type;

    private String transmission;

    private String color;

    private String year;

    private Boolean sold;

    private String description;

    private MultipartFile img;

    private Long price;

    private Long userId;

    private byte[] returnedImg;
}
