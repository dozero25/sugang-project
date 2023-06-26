package com.koreait.koreaitsugang.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@AllArgsConstructor
@Getter
public class CustomMaxCreditException extends RuntimeException{
    private Map<String, String> errorMap;
}
