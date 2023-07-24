package com.koreait.koreaitsugang.web.api;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.aop.annotation.ValidAspect;
import com.koreait.koreaitsugang.entity.ClassificationView;
import com.koreait.koreaitsugang.entity.OpenCourse;
import com.koreait.koreaitsugang.entity.PocketMst;
import com.koreait.koreaitsugang.security.PrincipalDetails;
import com.koreait.koreaitsugang.service.SugangService;
import com.koreait.koreaitsugang.web.dto.CMRespDto;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;
import com.koreait.koreaitsugang.web.dto.SearchSugangReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/sugang")
@RequiredArgsConstructor
public class SugangApi {

    private final SugangService sugangService;

    @GetMapping("/classification")
    public ResponseEntity<CMRespDto<List<ClassificationView>>> search(){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",sugangService.categories()));
    }

    @GetMapping("/search/total")
    public ResponseEntity<CMRespDto<Integer>> totalCount(SearchNumberListReqDto searchNumberListReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", sugangService.getSearchTotalCourses(searchNumberListReqDto)));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/all/course")
    public ResponseEntity<CMRespDto<List<OpenCourse>>> openCourses(@Valid SearchSugangReqDto searchSugangReqDto, BindingResult bindingResult){

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", sugangService.getloadAllCourse(searchSugangReqDto)));
    }

    @ParamsAspect
    @PostMapping("/apply")
    public ResponseEntity<CMRespDto<?>> applyCourse(@RequestBody PocketMst pocketMst, @AuthenticationPrincipal PrincipalDetails principalDetails){

        sugangService.applyCourse(pocketMst.getSubjectCode(), principalDetails.getUser().getUserId());

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", pocketMst));
    }

    @ParamsAspect
    @DeleteMapping("/delete")
    public ResponseEntity<CMRespDto<?>> deleteCourse(@RequestBody PocketMst pocketMst, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        sugangService.deleteCourse(pocketMst.getSubjectCode(), principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", pocketMst));
    }

    @ParamsAspect
    @GetMapping("/load")
    public ResponseEntity<CMRespDto<?>> loadCourses(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", sugangService.loadCourses(principalDetails.getUser().getUserId())));
    }

    @ParamsAspect
    @GetMapping("/credit")
    public ResponseEntity<CMRespDto<?>> loadCredit(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", sugangService.loadCredit(principalDetails.getUser().getUserId())));
    }

    @ParamsAspect
    @GetMapping("/credit/info")
    public ResponseEntity<CMRespDto<?>> getLoadUserCreditInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", sugangService.getCountAndCreditSumByUser(principalDetails.getUser().getUserId())));
    }


}