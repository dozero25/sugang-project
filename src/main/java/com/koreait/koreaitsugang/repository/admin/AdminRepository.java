package com.koreait.koreaitsugang.repository.admin;


import com.koreait.koreaitsugang.entity.*;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;
import com.koreait.koreaitsugang.web.dto.SearchReqDto;
import com.koreait.koreaitsugang.web.dto.SubjectReqDto;
import com.koreait.koreaitsugang.web.dto.admin.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminRepository {

    public List<String> majorCategory();

    public int getSearchUserTotalCount(AdminSearchReqDto adminSearchReqDto);

    public List<UserMst> getSearchUser (AdminSearchReqDto adminSearchReqDto);

    public int deleteUser(String username);

    public int deleteUsers(List<String> usernames);

    public int deleteUserImage(String username);

    public int registerUserImage(List<UserImage> userImages);

    public int saveStudent(AddStudentReqDto addStudentReqDto);

    public int saveStudentMst(AddStudentReqDto addStudentReqDto);

    public UserMst findUsername(String username);

    public int saveProfessor(AddProfessorReqDto addProfessorReqDto);

    public int saveProfessorMst(AddProfessorReqDto addProfessorReqDto);

    public UserMst findUsernameByUsername(String username);

    public UserImage findUserImageByUsername(String username);

    public int updateUserByUsername(UserMst userMst);

    // 이거 필요 없을 듯
    public String updateUsermstByUseranme(UpdateUserReqDto updateUserReqDto);

    public List<SubjectMst> searchSugang(SearchReqDto searchReqDto);

    public SubjectMst findBySubjectCode(int subjectCode);

    public int getSubjectTotalCount(SearchNumberListReqDto searchNumberListReqDto);

    public int deleteBySubjectCode(List<Integer> subjectCode);

    public int saveSubject(SubjectReqDto subjectReqDto);

    public int updateSubjectBySubjectCode(SubjectReqDto subjectReqDto);

    public int insertSubCredit(int userId);

    public CreditMst loadCredit(int userId);

    public List<CreditMst> loadAllCredit(CreditUserCountDto creditUserCountDto);

    public void insertCredit(CreditReqDto creditReqDto);

    public List<Integer> selOnlyUserId();

    public int getUserCreditTotalCount(CreditUserCountDto creditUserCountDto);

    public int deleteCreditUser(int userId);

    public int deleteCreditByUserId(List<Integer> userId);

    public int updateCreditByUserId(CreditReqDto creditReqDto);
}
