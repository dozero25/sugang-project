package com.koreait.koreaitsugang.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@AllArgsConstructor
@Getter
public class CustomApplyCountException extends RuntimeException{
    private Map<String, String> errorMap;
}
