package com.service.services.customer;

import com.service.dto.AnalyticsDTO;
import com.service.dto.BidDTO;
import com.service.dto.CarDTO;
import com.service.dto.SearchCarDTO;
import com.service.entities.Bid;
import com.service.entities.Car;
import com.service.entities.User;
import com.service.enums.BidStatus;
import com.service.repositories.BidRepository;
import com.service.repositories.CarRepository;
import com.service.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final UserRepository userRepository;

    private final CarRepository carRepository;

    private final BidRepository bidRepository;

    @Override
    public boolean createCar(CarDTO carDTO) throws IOException, ParseException {
        Optional<User> optionalUser = userRepository.findById(carDTO.getUserId());
        if(optionalUser.isPresent()) {
            Car car = new Car();
            car.setName(carDTO.getName());
            car.setType(carDTO.getType());
            car.setBrand(carDTO.getBrand());
            car.setPrice(carDTO.getPrice());
            car.setDescription(carDTO.getDescription());
            car.setColor(carDTO.getColor());
            car.setTransmission(carDTO.getTransmission());
            car.setSold(carDTO.getSold());

            car.setYear(carDTO.getYear() != null ? Integer.parseInt(carDTO.getYear()) : null);

            car.setImg(carDTO.getImg().getBytes());
            car.setUser(optionalUser.get());
            carRepository.save(car);
            return true;
        }
        return false;
    }

    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDTO).collect(Collectors.toList());
    }

    @Override
    public CarDTO getCarId(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDTO).orElse( null);
    }

    @Override
    public void deleteCarId(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public boolean updateCar(Long id, CarDTO carDTO) throws IOException, ParseException {
        Optional<Car> optionalCar = carRepository.findById(id);

        if(optionalCar.isPresent()) {
            Car car = optionalCar.get();
            car.setName(carDTO.getName());
            car.setType(carDTO.getType());
            car.setBrand(carDTO.getBrand());
            car.setPrice(carDTO.getPrice());
            car.setDescription(carDTO.getDescription());
            car.setColor(carDTO.getColor());
            car.setTransmission(carDTO.getTransmission());
            car.setSold(carDTO.getSold());


            car.setYear(carDTO.getYear() != null ? Integer.parseInt(carDTO.getYear()) : null);

            if(carDTO.getImg() != null && !carDTO.getImg().isEmpty()) {
                car.setImg(carDTO.getImg().getBytes());
            }
            carRepository.save(car);
            return true;
        }
        return false;
    }

    @Override
    public List<CarDTO> searchCar(SearchCarDTO searchCarDTO) {

        Car car = new Car();
        car.setType(searchCarDTO.getType());
        car.setColor(searchCarDTO.getColor());
        car.setType(searchCarDTO.getType());
        car.setTransmission(searchCarDTO.getTransmission());
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Example<Car> carExample = Example.of(car, exampleMatcher);
        List<Car> cars = carRepository.findAll(carExample);


        return cars.stream().map(Car::getCarDTO).collect(Collectors.toList());
    }

    @Override
    public List<CarDTO> getMyCars(Long userId) {
        return carRepository.findAllByUserId(userId).stream().map(Car::getCarDTO).collect(Collectors.toList());

    }

    @Override
    public boolean bidACar(BidDTO bidDTO) {
        Optional<Car> optionalCar = carRepository.findById(bidDTO.getCarId());
        Optional<User> optionalUser = userRepository.findById(bidDTO.getUserId());

        if(optionalCar.isPresent() && optionalUser.isPresent()) {
            Bid bid = new Bid();
            bid.setCar(optionalCar.get());
            bid.setPrice(bidDTO.getPrice());
            bid.setUser(optionalUser.get());
            bid.setBidStatus(BidStatus.PENDING);
            bidRepository.save(bid);
            return true;
        }


        return false;
    }

    @Override
    public List<BidDTO> getBidsByUserId(Long userId) {
        return bidRepository.findAllByUserId(userId).stream().map(Bid::getBidDTO).collect(Collectors.toList());
    }

    @Override
    public List<BidDTO> getBidsByCarId(Long carId) {
        return bidRepository.findAllByCarId(carId).stream().map(Bid::getBidDTO).collect(Collectors.toList());
    }

    @Override
    public boolean changeBidStatus(Long bidId, String status) {
        Optional<Bid> bid = bidRepository.findById(bidId);
        Car car = bid.get().getCar();

        if(bid.isPresent()) {
            Bid existingBid = bid.get();
            if(Objects.equals(status, "Approve")) {
                existingBid.setBidStatus(BidStatus.APROVED);
                car.setSold(true);
            } else {
                existingBid.setBidStatus(BidStatus.REJECTED);
            }
            bidRepository.save(existingBid);
            return true;
        }
        return false;
    }

    @Override
    public AnalyticsDTO getAnalytics(Long userId) {
        AnalyticsDTO analyticsDTO = new AnalyticsDTO();
        analyticsDTO.setTotalCars(carRepository.countByUserId(userId));
        analyticsDTO.setSoldCars(carRepository.countByUserIdAndSoldTrue(userId));
        return analyticsDTO;
    }
}
