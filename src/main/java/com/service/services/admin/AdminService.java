package com.service.services.admin;

import com.service.dto.BidDTO;
import com.service.dto.CarDTO;
import com.service.dto.SearchCarDTO;

import java.util.List;

public interface AdminService {
    List<CarDTO> getAllCars();

    CarDTO getCarId(Long id);

    void deleteCarId(Long id);

    List<CarDTO> searchCar(SearchCarDTO searchCarDTO);

    List<BidDTO> getBids();

    List<BidDTO> getBidsByCarId(Long carId);

    boolean changeBidStatus(Long bidId, String status);
}

