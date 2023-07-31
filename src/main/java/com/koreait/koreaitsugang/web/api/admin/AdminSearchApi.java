package com.koreait.koreaitsugang.web.api.admin;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.aop.annotation.ValidAspect;
import com.koreait.koreaitsugang.entity.CreditMst;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.service.BoardService;
import com.koreait.koreaitsugang.service.admin.AdminSearchService;
import com.koreait.koreaitsugang.web.dto.CMRespDto;
import com.koreait.koreaitsugang.web.dto.admin.*;
import com.koreait.koreaitsugang.entity.SubjectMst;
import com.koreait.koreaitsugang.web.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminSearchApi {

    @Autowired
    private AdminSearchService adminSearchService;

    @Autowired
    private BoardService boardService;

    @GetMapping("/usersearch")
    public ResponseEntity<CMRespDto<?>> search(){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",adminSearchService.Categories()));
    }

    @GetMapping("")
    public ResponseEntity<CMRespDto<?>> searchCategories(){
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",adminSearchService.Categories()));
    }

    @GetMapping("/userregister")
    public ResponseEntity<CMRespDto<?>> register(){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",adminSearchService.Categories()));
    }

    @GetMapping("/totalcount")
    public ResponseEntity<CMRespDto<?>> getUserTotalCount(AdminSearchReqDto adminSearchReqDto) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.UserTotalCounts(adminSearchReqDto)));
    }

    @GetMapping(path = "/sugang/{subjectCode}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getSugang(@PathVariable("subjectCode") int subjectCode) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",adminSearchService.getSugang(subjectCode)));
    }

    @ParamsAspect
    @ValidAspect
    @GetMapping("/users")
    public ResponseEntity<CMRespDto<List<UserMst>>> searchUser(@Valid AdminSearchReqDto adminSearchReqDto, BindingResult bindingResult){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminSearchService.getAdminSearchUser(adminSearchReqDto)));
    }
    @ParamsAspect
    @DeleteMapping("/{username}")
    public ResponseEntity<CMRespDto<?>> removeUser(@PathVariable String username){
        adminSearchService.removeUser(username);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @DeleteMapping("/users")
    public ResponseEntity<CMRespDto<?>> removeUsers(@RequestBody DeleteUserReqDto deleteUserReqDto){
        adminSearchService.removeUsers(deleteUserReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @PostMapping("/user/{username}/images")
    public ResponseEntity<CMRespDto<?>> registerUserImg(@PathVariable String username, @RequestPart List<MultipartFile> files) {
        adminSearchService.registerUserImage(username, files);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @PostMapping("/user/{username}/images/modification")
    public ResponseEntity<CMRespDto<?>> modifyUserImg(@PathVariable String username, @RequestPart List<MultipartFile> files) {
        adminSearchService.registerUserImage(username, files);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }


    @ParamsAspect
    @ValidAspect
    @PostMapping("/studentRegister")
    public ResponseEntity<CMRespDto<?>> registerStudent(@Valid @RequestBody AddStudentReqDto addStudentReqDto, BindingResult bindingResult){
        adminSearchService.registerStudent(addStudentReqDto);
        return ResponseEntity
                .created(URI.create(""+addStudentReqDto.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/professorRegister")
    public ResponseEntity<CMRespDto<?>> registerProfessor(@Valid @RequestBody AddProfessorReqDto addProfessorReqDto, BindingResult bindingResult){
        adminSearchService.registerProfessor(addProfessorReqDto);
        return ResponseEntity
                .created(URI.create(""+addProfessorReqDto.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully", true));
    }

    @GetMapping(path = "/user/{username}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getUser(@PathVariable("username") String username){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully",adminSearchService.getUsernameAndImage(username)));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping(path = "/user/{username}")
    public ResponseEntity<CMRespDto<?>> updateUser(@PathVariable("username") String username, @Valid @RequestBody UpdateUserReqDto updateUserReqDto, BindingResult bindingResult){
        adminSearchService.modifyUser(updateUserReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }


    @DeleteMapping("/user/{username}/image/{imageId}")
    public ResponseEntity<CMRespDto<?>> removeUserImage(@PathVariable("username") String username, @PathVariable int imageId){
        adminSearchService.removeUserImage(username);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<CMRespDto<List<SubjectMst>>> searchSugang(@Valid SearchReqDto searchReqDto, BindingResult bindingResult){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully", adminSearchService.searchSugang(searchReqDto)));
    }

    @GetMapping("/sugangs/totalcount")
    public ResponseEntity<CMRespDto<?>> getSubjectTotalCount(SearchNumberListReqDto searchNumberListReqDto){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully", adminSearchService.getSubjectTotalCount(searchNumberListReqDto)));
    }

    @ParamsAspect
    @DeleteMapping("/sugangs")
    public ResponseEntity<CMRespDto<?>> deleteSubject(@RequestBody DeleteSubjectsReqDto deleteSubjectsReqDto){
        adminSearchService.deleteSubject(deleteSubjectsReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/sugang")
    public ResponseEntity<CMRespDto<?>> saveSubject(@RequestBody @Valid SubjectReqDto subjectReqDto, BindingResult bindingResult){
        adminSearchService.saveSubject(subjectReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully",true));
    }

    @ParamsAspect
    @ValidAspect
    @PatchMapping("/sugang/{subjectCode}")
    public ResponseEntity<CMRespDto<?>> modifySubject(@PathVariable("subjectCode") int subjectCode, @Valid @RequestBody SubjectReqDto subjectReqDto, BindingResult bindingResult){
        adminSearchService.modifySubject(subjectReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @GetMapping(path = "/credit/{userId}")
    public ResponseEntity<CMRespDto<?>> loadCredit(@PathVariable("userId") int userId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.loadCredit(userId)));
    }

    @PostMapping("/creditUser/{userId}")
    public ResponseEntity<CMRespDto<?>> loadCreditUser(@PathVariable("userId") int userId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.loadCredit(userId)));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/all/credit")
    public ResponseEntity<CMRespDto<List<CreditMst>>> loadAllCredit(@Valid CreditUserCountDto creditUserCountDto, BindingResult bindingResult) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.loadAllCredit(creditUserCountDto)));
    }

    @ParamsAspect
    @PostMapping("/get/credit")
    public ResponseEntity<CMRespDto<?>> insertCredit(@RequestBody CreditReqDto creditReqDto) {
        adminSearchService.insertCredit(creditReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @GetMapping("/get/userids")
    public ResponseEntity<CMRespDto<?>> selOnlyUserId(){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.selOnlyUserId()));
    }

    @GetMapping("/credit/totalCount")
    public ResponseEntity<CMRespDto<?>> getUserCreditTotalCount(CreditUserCountDto creditUserCount){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminSearchService.getUserCreditTotalCount(creditUserCount)));
    }

    @ParamsAspect
    @DeleteMapping("/credit/delete/{userId}")
    public ResponseEntity<CMRespDto<?>> deleteCreditUser(@PathVariable int userId){
        adminSearchService.deleteCreditUser(userId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @DeleteMapping("/credit/deletes")
    public ResponseEntity<CMRespDto<?>> deleteCreditAllUser(@RequestBody DeleteCreditUserReqDto deleteCreditUserReqDto){
        adminSearchService.deleteCreditByUserId(deleteCreditUserReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @ValidAspect
    @PatchMapping("/credit/{userId}")
    public ResponseEntity<CMRespDto<?>> modifyCredit(@PathVariable("userId") int subjectCode, @Valid @RequestBody CreditReqDto creditReqDto, BindingResult bindingResult){
        adminSearchService.modifyCreditByUserId(creditReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }
}

