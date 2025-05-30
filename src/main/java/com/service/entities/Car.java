package com.service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.service.dto.CarDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String brand;

    private String type;

    private String transmission;

    private String color;


    private Integer year;  // A entidade espera Date

    private Boolean sold;

    @Lob
    private String description;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte [] img;

    private Long price;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public CarDTO getCarDTO() {
        CarDTO carDto = new CarDTO();
        carDto.setId(id);
        carDto.setName(name);
        carDto.setBrand(brand);

        //SEPARA Q LA VEM BOMBA
        carDto.setUserId(user.getId());
        //------------------

        carDto.setType(type);
        carDto.setTransmission(transmission);
        carDto.setColor(color);

        //DATA/ANO do carro
        carDto.setYear(year != null ? year.toString() : null);
        //-----------------------


        carDto.setSold(sold);
        carDto.setDescription(description);
        carDto.setPrice(price);
        carDto.setReturnedImg(img);
        return carDto;
    }
}