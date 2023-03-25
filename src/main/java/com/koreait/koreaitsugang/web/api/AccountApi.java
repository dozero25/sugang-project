package com.koreait.koreaitsugang.web.api;


import com.koreait.koreaitsugang.entity.RoleDtl;
import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.aop.annotation.ValidAspect;
import com.koreait.koreaitsugang.entity.MypageMst;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.security.PrincipalDetails;
import com.koreait.koreaitsugang.service.AccountService;
import com.koreait.koreaitsugang.web.dto.CMRespDto;
import com.koreait.koreaitsugang.web.dto.MypageMstReqDto;
import com.koreait.koreaitsugang.web.dto.UserImageDto;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;

    @PutMapping("/encodePassword/{userId}")
    public ResponseEntity<? extends CMRespDto<?>> encodePassword(@RequestBody @Valid UserMst userMst){

        accountService.updatePassword(userMst);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @PostMapping("/saveRoleId")
    public ResponseEntity<?> saveRoleId(@RequestBody RoleDtl roleDtl) {
        accountService.saveRoleId(roleDtl);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> getUser(@PathVariable int userId){
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", accountService.getUser(userId)));
    }

    @GetMapping("/principal")
    public ResponseEntity<CMRespDto<? extends PrincipalDetails>> getPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        if (principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                log.info("로그인된 사용자의 권한 : {}", role.getAuthority());
            });
        }
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));
    }

    @ParamsAspect
    @GetMapping("/mypage/{userId}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> mypageUser(@PathVariable int userId, @AuthenticationPrincipal PrincipalDetails principalDetails){

        if (principalDetails == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), "failed", null));
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", accountService.mypageUser(userId)));
    }

    @ParamsAspect
    @GetMapping("{userId}")
    public ResponseEntity<CMRespDto<? extends MypageMst>> loadUserInformation(@PathVariable int userId, @AuthenticationPrincipal PrincipalDetails principalDetails){

        if (principalDetails == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), "failed", null));
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", accountService.loadUserInformation(userId)));
    }

    @ParamsAspect
    @PostMapping("/user/{username}/images")
    public ResponseEntity<CMRespDto<?>> registerUserImg(@PathVariable String username, @ApiParam @RequestPart(required = false) List<MultipartFile> files) {
        accountService.registerUserImages(username, files);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @PatchMapping("/mypage/{username}")
    public ResponseEntity<CMRespDto<?>> modifyUser(@PathVariable("username") String username, @Valid @RequestBody MypageMstReqDto mypageMstReqDto, BindingResult bindingResult){
        accountService.modifyUSer(mypageMstReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @PostMapping("/user/{username}/images/modification")
    public ResponseEntity<CMRespDto<?>> modifyUserImg(@PathVariable String username, @RequestPart(value="files",required = false)  List<MultipartFile> files) {
        accountService.registerUserImages(username, files);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @GetMapping("/user/{userId}/images")
    public ResponseEntity<CMRespDto<?>> getImages(@PathVariable int userId) {
        List<UserImageDto> userImageDtos = accountService.getUsers(userId);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", userImageDtos));
    }

    @DeleteMapping("/user/{username}/image/{imageId}")
    public ResponseEntity<CMRespDto<?>> removeUserImg(@PathVariable String username, @PathVariable int imageId) {
        accountService.removeUserImage(imageId);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", null));
    }
}