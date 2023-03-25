package com.koreait.koreaitsugang.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SearchReqDto {
    @ApiModelProperty(required = false, example = "백엔드")
    private String searchValue;

    @ApiModelProperty(required = false, example = "컴퓨터공학과")
    private String category;

    @NotBlank
    @ApiModelProperty(value = "조회 전체 = N, 조회제한 = Y", required = true)
    private String limit;

    @ApiModelProperty(required = false, example = "1")
    private int page;

    @ApiModelProperty(required = false, example = "20")
    private int count;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex(){
        index = (page-1) * count;
    }
}
