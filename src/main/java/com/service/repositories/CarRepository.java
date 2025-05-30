package com.service.repositories;

import com.service.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findAllByUserId(Long userId);

    Long countByUserId(Long userId);

    Long countByUserIdAndSoldTrue(Long userId);
}
