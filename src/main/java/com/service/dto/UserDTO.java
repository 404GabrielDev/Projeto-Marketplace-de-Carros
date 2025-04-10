package com.service.dto;

import com.service.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    private String name;

    private UserRole userRole;

    private String email;
}
