package com.koreait.koreaitsugang.config.handler;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String errorMessage = "Please check your ID and Password";

        if (exception instanceof BadCredentialsException) {
            errorMessage = "Please check the account information";
        } else if (exception instanceof InsufficientAuthenticationException) {
            errorMessage = "Please check the additional verification value";
        }
        setDefaultFailureUrl("/account/login/error");
        super.onAuthenticationFailure(request, response, exception);
    }
}
