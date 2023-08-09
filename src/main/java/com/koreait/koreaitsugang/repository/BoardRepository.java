package com.koreait.koreaitsugang.repository;

import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.web.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardRepository {

    public List<BoardDto> getAllBoardList(SearchBoardReqDto searchBoardReqDto);

    public BoardDto getBoardViewByUserIdAndBoardId(int boardId);

    public int getSearchBoardTotalCount(SearchBoardReqDto searchBoardReqDto);

    public int saveBoard(BoardMst boardMst);

    public int setCountVisit(BoardVisitCountDto boardVisitCountDto);

    public int updateBoardByBoardId(BoardMst boardMst);

    public BoardDto getBoardUpdateViewByUserIdAndBoardId(int boardId);

    public int deleteBoard(int boardId);

    public List<BoardCategoryDto> boardCategory();

    public List<BoardDto> getBoardListByBoardGrp(SearchBoardGrpReqDto searchBoardGrpReqDto);

    public int getSearchBoardCountByBoardGrp(SearchBoardGrpReqDto searchBoardGrpReqDto);

    public void inputBoardReplyByBoardId(BoardReplyDto boardReplyDto);

    public List<BoardReplyDto> getBoardReplyByBoardId(int boardId);
}

