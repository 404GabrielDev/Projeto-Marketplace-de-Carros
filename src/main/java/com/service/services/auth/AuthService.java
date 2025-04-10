package com.service.services.auth;

import com.service.dto.SignupRequest;
import com.service.dto.UserDTO;

public interface AuthService {

    UserDTO signup(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
