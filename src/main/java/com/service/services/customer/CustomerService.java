package com.service.services.customer;

import com.service.dto.AnalyticsDTO;
import com.service.dto.BidDTO;
import com.service.dto.CarDTO;
import com.service.dto.SearchCarDTO;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface CustomerService {

    boolean createCar(CarDTO carDTO) throws IOException, ParseException;

    List<CarDTO> getAllCars();

    CarDTO getCarId(Long id);

    void deleteCarId(Long id);

    boolean updateCar(Long id, CarDTO carDTO) throws IOException, ParseException;

    List<CarDTO> searchCar(SearchCarDTO searchCarDTO);

    List<CarDTO> getMyCars(Long userId);

    boolean bidACar(BidDTO bidDTO);

    List<BidDTO> getBidsByUserId(Long userId);

    List<BidDTO> getBidsByCarId(Long carId);

    boolean changeBidStatus(Long bidId, String status);

    AnalyticsDTO getAnalytics(Long userId);
}
