package com.service.controllers;

import com.service.dto.BidDTO;
import com.service.dto.CarDTO;
import com.service.dto.SearchCarDTO;
import com.service.services.customer.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/car")
    public ResponseEntity<?> addCar(@ModelAttribute CarDTO carDTO, HttpServletRequest request) throws Exception {
        long contentLength = request.getContentLength();

        boolean success = customerService.createCar(carDTO);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(customerService.getAllCars());
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<CarDTO> getCarId(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCarId(id));
    }

    @GetMapping("/test-auth")
    public ResponseEntity<?> testAuth() {
        return ResponseEntity.ok("Ok");
    }

    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<Void> deleteCarId(@PathVariable Long id) {
        customerService.deleteCarId(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/car/{id}")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @ModelAttribute CarDTO carDTO) throws Exception {
        boolean success = customerService.updateCar(id, carDTO);
        if (success) return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/car/search")
    public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO searchCarDTO) {
        return ResponseEntity.ok(customerService.searchCar(searchCarDTO));
    }

    @GetMapping("/my-cars/{userId}")
    public ResponseEntity<List<CarDTO>> getMyCars(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getMyCars(userId));
    }

    @PostMapping("/car/bid")
    public ResponseEntity<?> bidACar(@RequestBody BidDTO bidDTO) throws Exception {
        boolean success = customerService.bidACar(bidDTO);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/car/bids/{userId}")
    public ResponseEntity<List<BidDTO>> getBidsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getBidsByUserId(userId));
    }

    @GetMapping("/car/{carId}/bids")
    public ResponseEntity<List<BidDTO>> getBidsByCarId(@PathVariable Long carId) {
        return ResponseEntity.ok(customerService.getBidsByCarId(carId));
    }

    @GetMapping("/car/bid/{bidId}/{status}")
    public ResponseEntity<?> changeBidStatus(@PathVariable Long bidId, @PathVariable String status) {
        boolean success = customerService.changeBidStatus(bidId, status);
        if(success) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/car/analytics/{userId}")
    public ResponseEntity<?> getAnalytics(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getAnalytics(userId));
    }

    //TESTAR OS DADOS VIA POSTMAN, VERIFICAR SE O ERRO É NA INTERFACE OU NO BACKEND!


}
