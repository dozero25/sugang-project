package com.koreait.koreaitsugang;

import com.koreait.koreaitsugang.service.admin.AdminSearchService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;

@SpringBootApplication
public class KoreaitsugangApplication {


	public static void main(String[] args) {
		SpringApplication.run(KoreaitsugangApplication.class, args);
	}

}
