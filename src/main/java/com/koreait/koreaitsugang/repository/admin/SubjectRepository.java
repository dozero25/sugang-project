package com.koreait.koreaitsugang.repository.admin;


import com.koreait.koreaitsugang.entity.SubjectMst;
import com.koreait.koreaitsugang.entity.UserImage;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.web.dto.SearchNumberListReqDto;
import com.koreait.koreaitsugang.web.dto.SearchReqDto;
import com.koreait.koreaitsugang.web.dto.SubjectReqDto;
import com.koreait.koreaitsugang.web.dto.admin.AddProfessorReqDto;
import com.koreait.koreaitsugang.web.dto.admin.AddStudentReqDto;
import com.koreait.koreaitsugang.web.dto.admin.AdminSearchReqDto;
import com.koreait.koreaitsugang.web.dto.admin.UpdateStudentReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubjectRepository {


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

    public int updateStudentByUsername(UpdateStudentReqDto updateStudentReqDto);

    public int updateStudentmstByUseranme(UpdateStudentReqDto updateStudentReqDto);

    public List<SubjectMst> searchSugang(SearchReqDto searchReqDto);

    public SubjectMst findBySubjectCode(int subjectCode);

    public int getSubjectTotalCount(SearchNumberListReqDto searchNumberListReqDto);

    public int deleteBySubjectCode(List<Integer> subjectCode);

    public int saveSubject(SubjectReqDto subjectReqDto);

    public int updateSubjectBySubjectCode(SubjectReqDto subjectReqDto);
}
