package com.service.dto;

import com.service.enums.BidStatus;
import lombok.Data;

@Data
public class BidDTO {

    private Long id;

    private Long price;

    private BidStatus bidStatus;

    private Long userId;

    private Long carId;

    private String username;

    private String carBrand;

    private String email;

    private String sellerName;

    private String carName;
}
