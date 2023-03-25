package com.koreait.koreaitsugang.service;

import com.koreait.koreaitsugang.entity.RoleDtl;
import com.koreait.koreaitsugang.entity.MypageMst;
import com.koreait.koreaitsugang.entity.UserImage;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.exception.CustomValidationException;
import com.koreait.koreaitsugang.repository.AccountRepository;
import com.koreait.koreaitsugang.web.dto.MypageMstReqDto;
import com.koreait.koreaitsugang.web.dto.UserImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Value("${file.path}")
    private String filePath;

    public UserMst updatePassword(UserMst userMst) {
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));
        accountRepository.updatePassword(userMst);

        return userMst;
    }

    public int saveRoleId(RoleDtl roleDtl) {
        return accountRepository.saveRole(roleDtl);
    }


    public UserMst getUser(int userId){
        return accountRepository.findUserByUserId(userId);
    }

    public void modifyUSer(MypageMstReqDto mypageMstReqDto){
        accountRepository.updateUserByUsername(mypageMstReqDto);
    }

    public Map<String, Object> mypageUser(int userId){
        Map<String, Object> result = new HashMap<>();
        result.put("mypageMst", accountRepository.findMypage(userId));
        result.put("userImage", accountRepository.findUserImageByUsername(userId));

        return result;
    }

    public MypageMst loadUserInformation(int userId){
        return accountRepository.loadUserInformation(userId);
    }

    public void registerUserImages(String username, List<MultipartFile> files) {
        if (files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new CustomValidationException(errorMap);
        }

        List<UserImage> userImages = new ArrayList<UserImage>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "user/" + tempFileName);

            File f = new File(filePath + "user/");
            if (!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            UserImage userImage = UserImage.builder()
                    .username(username)
                    .saveName(tempFileName)
                    .originName(originFileName)
                    .build();

            userImages.add(userImage);
        });
        accountRepository.registerUserImages(userImages);
    }

    public List<UserImageDto> getUsers(int userId) {
        return accountRepository.findUserImageAll(userId);
    }

    public void removeUserImage(int imageId) {
        UserImage userImage = accountRepository.findUserImageByImageId(imageId);

        if (userImage == null){
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "존재하지 않는 이미지 ID입니다.");

            throw new CustomValidationException(errorMap);
        }

        if (accountRepository.deleteUserImage(imageId) > 0) {
            File file = new File(filePath + "book/" + userImage.getSaveName());
            if(file.exists()) { // 경로가 존재한다면
                file.delete();
            }
        }
    }


}