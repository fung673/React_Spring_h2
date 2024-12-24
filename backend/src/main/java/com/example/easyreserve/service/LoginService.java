package com.example.easyreserve.service;

import com.example.easyreserve.model.LoginRequest;
import com.example.easyreserve.model.LoginResponse;
import com.example.easyreserve.model.User;
import com.example.easyreserve.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user != null && loginRequest.getPassword().equals(user.getPassword())) {
            response.setSuccess(true);
            response.setMessage("Login successful");
        } else {
            response.setSuccess(false);
            response.setMessage("Login failed");
        }
        return response;
    }
}