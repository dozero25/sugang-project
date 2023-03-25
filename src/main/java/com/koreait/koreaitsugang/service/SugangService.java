package com.koreait.koreaitsugang.service;

import com.koreait.koreaitsugang.entity.ClassificationView;
import com.koreait.koreaitsugang.entity.OpenCourse;
import com.koreait.koreaitsugang.entity.PocketMst;
import com.koreait.koreaitsugang.exception.CustomApplyCountException;
import com.koreait.koreaitsugang.repository.SugangRepository;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;
import com.koreait.koreaitsugang.web.dto.SearchSugangReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SugangService {

    private final SugangRepository sugangRepository;

    public List<ClassificationView> categories() {
        return sugangRepository.searchCategory();
    }

    public int getSearchTotalCourses(SearchNumberListReqDto searchNumberListReqDto) {
        return sugangRepository.searchTotalCourse(searchNumberListReqDto);
    }

    public List<OpenCourse> getOpenCourse(SearchSugangReqDto searchSugangReqDto) {
        searchSugangReqDto.setIndex();
        return sugangRepository.searchCourse(searchSugangReqDto);
    }

    public int applyCourse(int subjectCode, int userId){

        abilityApply(subjectCode);

        PocketMst pocketMst = PocketMst.builder()
                .subjectCode(subjectCode)
                .userId(userId)
                .build();

        return sugangRepository.saveCourse(pocketMst);
    }

    public int deleteCourse(int subjectCode, int userId) {
        PocketMst pocketMst = PocketMst.builder()
                .subjectCode(subjectCode)
                .userId(userId)
                .build();

        return sugangRepository.deleteCourse(pocketMst);
    }

    public List<OpenCourse> loadCourses(int userId) {
        return sugangRepository.loadCourse(userId);
    }

    private void abilityApply(int subjectCode){

        OpenCourse requestUser = sugangRepository.findCourse(subjectCode);

        if (requestUser != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("applyCountError", "이미 선택한 과목입니다.");

            throw new CustomApplyCountException(errorMap);
        }
    }
}
