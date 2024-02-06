package com.koreait.koreaitsugang.repository;

import com.koreait.koreaitsugang.entity.RoleDtl;
import com.koreait.koreaitsugang.entity.MypageMst;
import com.koreait.koreaitsugang.entity.UserImage;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.web.dto.MypageMstReqDto;
import com.koreait.koreaitsugang.web.dto.UserImageDto;
import com.koreait.koreaitsugang.web.dto.admin.AddProfessorReqDto;
import com.koreait.koreaitsugang.web.dto.admin.AddStudentReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountRepository {
    public UserMst findUserByUserId(int userId);
    public UserMst findUserByUsername(String username);

    public int updatePassword(UserMst userMst);

    public int saveRole(RoleDtl roleDtl);

    public int saveRoleStudent(AddStudentReqDto addStudentReqDto);

    public int saveRoleProfessor(AddProfessorReqDto addProfessorReqDto);

    public MypageMst findMypage(int userId);

    public int registerUserImages(List<UserImage> userImages);

    public List<UserImageDto> findUserImageAll(int userId);

    public UserImage findUserImageByImageId(int imageId);

    public UserImage findUserImageByUsername(int userId);

    public int deleteUserImage(int imageId);

    public void updateUserByUsername(MypageMstReqDto mypageMstReqDto);

    public MypageMst loadUserInformation(int userId);

    public int registerUser(UserMst userMst);
}