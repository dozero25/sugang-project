package com.koreait.koreaitsugang.repository;

import com.koreait.koreaitsugang.entity.ClassificationView;
import com.koreait.koreaitsugang.entity.CreditMst;
import com.koreait.koreaitsugang.entity.OpenCourse;
import com.koreait.koreaitsugang.entity.PocketMst;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;

import com.koreait.koreaitsugang.web.dto.SearchSugangReqDto;
import com.koreait.koreaitsugang.web.dto.UserPocketCreditInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface SugangRepository {

    public List<ClassificationView> searchCategory();

    public int searchTotalCourse(SearchNumberListReqDto searchNumberListReqDto);

    public List<OpenCourse> getloadAllCourse(SearchSugangReqDto searchSugangReqDto);

    public int loadUserId(int userId);

    public int availabilityApply(int subjectCode);

    public int saveCourse(PocketMst pocketMst);

    public int deleteCourse(PocketMst pocketMst);

    public List<OpenCourse> loadCourse(int userId);

    public OpenCourse findCourse(int subjectCode);

    public CreditMst loadCredit(int userId);

    public UserPocketCreditInfo getCountAndCreditSumByUserId(int userId);
}
