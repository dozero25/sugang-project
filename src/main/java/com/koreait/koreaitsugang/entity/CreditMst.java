package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreditMst {

    private int userId;

    private double pastCredit;
    private double pastAvg;
    private double maxCredit;
    private double presentCredit;

}
