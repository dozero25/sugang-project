package com.koreait.koreaitsugang.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreditInsertDto {

    private int userId;

    private double pastCredit;
    private double pastAvg;
    private double maxCredit;
    private double presentCredit;
    private double subCredit;

}
