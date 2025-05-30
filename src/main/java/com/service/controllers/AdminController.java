package com.service.controllers;

import com.service.dto.BidDTO;
import com.service.dto.CarDTO;
import com.service.dto.SearchCarDTO;
import com.service.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(adminService.getAllCars());
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<CarDTO> getCarId(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCarId(id));
    }

    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        adminService.deleteCarId(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/car/search")
    public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO searchCarDTO) {
        return ResponseEntity.ok(adminService.searchCar(searchCarDTO));
    }

    @GetMapping("/car/bids")
    public ResponseEntity<List<BidDTO>> getBids() {
        return ResponseEntity.ok(adminService.getBids());
    }

    @GetMapping("/car/bid/{bidId}/{status}")
    public ResponseEntity<?> deleteCar(@PathVariable Long bidId, @PathVariable String status) {
        boolean success = adminService.changeBidStatus(bidId, status);
        if(success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }


}
