package com.koreait.koreaitsugang.service.admin;

import com.koreait.koreaitsugang.entity.*;
import com.koreait.koreaitsugang.exception.CustomMaxCreditException;
import com.koreait.koreaitsugang.exception.CustomValidationException;
import com.koreait.koreaitsugang.repository.AccountRepository;
import com.koreait.koreaitsugang.web.dto.DeleteSubjectsReqDto;
import com.koreait.koreaitsugang.web.dto.admin.*;
import com.koreait.koreaitsugang.repository.admin.AdminRepository;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;
import com.koreait.koreaitsugang.web.dto.SearchReqDto;
import com.koreait.koreaitsugang.web.dto.SubjectReqDto;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AdminSearchService {

    @Value("${file.path}")
    private String filePath;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<SubjectMst> searchSugang(SearchReqDto searchReqDto) {
        searchReqDto.setIndex();
        return adminRepository.searchSugang(searchReqDto);
    }

    public List<DepartmentMst> Categories() {
        return adminRepository.getCategory();
    }

    public int UserTotalCounts(AdminSearchReqDto adminSearchReqDto) {
        adminRepository.getSearchUserTotalCount(adminSearchReqDto);
        return adminRepository.getSearchUserTotalCount(adminSearchReqDto);
    }

    public List<UserMst> getAdminSearchUser(AdminSearchReqDto adminSearchReqDto) {
        adminSearchReqDto.setIndex();
        return adminRepository.getSearchUser(adminSearchReqDto);
    }

    public void removeUser(String username) {
        adminRepository.deleteUser(username);
    }

    public void removeUsers(DeleteUserReqDto deleteUserReqDto) {
        adminRepository.deleteUsers(deleteUserReqDto.getUsernames());
    }

    public void registerUserImage(String username, List<MultipartFile> files) {
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

            File f = new File(filePath + "user");
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

        adminRepository.registerUserImage(userImages);
    }

    public void dublicateUsername(String username) {
        UserMst userMst = adminRepository.findUsername(username);
        if (userMst != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("username", "이미 존재하는 학번(직번)입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public AddStudentReqDto registerStudent(AddStudentReqDto addStudentReqDto) {
        System.out.println("학생등록");
        addStudentReqDto.setPassword(new BCryptPasswordEncoder().encode(addStudentReqDto.getPassword()));
        adminRepository.saveStudent(addStudentReqDto);
        adminRepository.saveStudentMst(addStudentReqDto);
        accountRepository.saveRoleStudent(addStudentReqDto);

        adminRepository.insertSubCredit(addStudentReqDto.getUserId());

        return addStudentReqDto;
    }

    public AddProfessorReqDto registerProfessor(AddProfessorReqDto addProfessorReqDto) {
        System.out.println("교수등록");
        addProfessorReqDto.setPassword(new BCryptPasswordEncoder().encode(addProfessorReqDto.getPassword()));
        adminRepository.saveProfessor(addProfessorReqDto);
        adminRepository.saveProfessorMst(addProfessorReqDto);

        accountRepository.saveRoleProfessor(addProfessorReqDto);

        return addProfessorReqDto;
    }

    public Map<String, Object> getUsernameAndImage(String username) {
        Map<String, Object> result = new HashMap<>();
        result.put("username", adminRepository.findUsernameByUsername(username));
        result.put("userImage", adminRepository.findUserImageByUsername(username));

        return result;
    }

    public int getSubjectTotalCount(SearchNumberListReqDto searchNumberListReqDto) {
        return adminRepository.getSubjectTotalCount(searchNumberListReqDto);
    }

    public void deleteSubject(DeleteSubjectsReqDto deleteSubjectsReqDto) {
        adminRepository.deleteBySubjectCode(deleteSubjectsReqDto.getSubjectCodes());
    }

    public void saveSubject(SubjectReqDto subjectReqDto) {
        duplicateSubjectCode(subjectReqDto.getSubjectCode());
        adminRepository.saveSubject(subjectReqDto);
    }

    public void modifySubject(SubjectReqDto subjectReqDto) {
        adminRepository.updateSubjectBySubjectCode(subjectReqDto);
    }

    public Map<String, Object> getSugang(int subjectCode) {
        Map<String, Object> result = new HashMap<>();
        result.put("subjectMst", adminRepository.findBySubjectCode(subjectCode));

        return result;
    }

    public void modifyUser(UpdateUserReqDto updateUserReqDto) {

        adminRepository.updateUserByUsername(updateUserReqDto);
        adminRepository.updateUserGradeByUseranme(updateUserReqDto);
    }

    public void removeUserImage(String username) {
        UserImage userImage = adminRepository.findUserImageByUsername(username);

        if (userImage == null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "존재하지 않는 이미지 ID입니다.");

            throw new CustomValidationException(errorMap);
        }

        if (adminRepository.deleteUserImage(username) > 0) {
            File file = new File(filePath + "user/" + userImage.getSaveName());
            if (file.exists()) {
                file.delete();
            }
        }

    }
    private void duplicateSubjectCode(int subjectCode){
        SubjectMst subjectMst = adminRepository.findBySubjectCode(subjectCode);
        if (subjectMst != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("subjectCode", "이미 존재하는 과목 코드입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public CreditMst loadCredit(int userId){
        return adminRepository.loadCredit(userId);
    }

    public int getUserCreditTotalCount(CreditUserCountDto creditUserCount){
        return adminRepository.getUserCreditTotalCount(creditUserCount);
    }

    public List<CreditMst> loadAllCredit(CreditUserCountDto creditUserCountDto){
        creditUserCountDto.setIndex();
        return adminRepository.loadAllCredit(creditUserCountDto);
    }

    public void insertCredit(CreditReqDto creditReqDto){
        insertCreditErrorIndo(creditReqDto);
        adminRepository.insertCredit(creditReqDto);
    }
    private void insertCreditErrorIndo(CreditReqDto creditReqDto){
        if(creditReqDto.getMaxCredit() > creditReqDto.getSubCredit()) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("creditInsertDto", "총 학점은 총 신청 학점보다 작을 수 없습니다.");

            throw new CustomMaxCreditException(errorMap);
        }
    }

    public List<Integer> selOnlyUserId(){
        return adminRepository.selOnlyUserId();
    }

    public void deleteCreditUser(int userId ) {
        adminRepository.deleteCreditUser(userId);
    }

    public void deleteCreditByUserId(DeleteCreditUserReqDto deleteCreditUserReqDto) {
        adminRepository.deleteCreditByUserId(deleteCreditUserReqDto.getUserIds());
    }

    public void modifyCreditByUserId(CreditReqDto creditReqDto){
        adminRepository.updateCreditByUserId(creditReqDto);
    }
}
