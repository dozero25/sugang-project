package com.koreait.koreaitsugang.web.dto.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class AdminSearchReqDto {

    private String searchValue;

    private String category;

    private int page;

    @NotBlank
    @ApiModelProperty(value = "조회전체 = N, 조회제한 = Y", required = true)
    private String limit;
    private int count;

    private int index;

    public void setIndex(){
        index = (page - 1) * count;
    }

}
