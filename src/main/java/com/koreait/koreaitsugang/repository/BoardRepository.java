package com.koreait.koreaitsugang.repository;

import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.web.dto.BoardDto;
import com.koreait.koreaitsugang.web.dto.BoardVisitCountDto;
import com.koreait.koreaitsugang.web.dto.BoardVisitDto;
import com.koreait.koreaitsugang.web.dto.SearchBoardReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardRepository {

    public List<BoardDto> getAllBoardList(SearchBoardReqDto searchBoardReqDto);

    public BoardDto getBoardViewByUserIdAndBoardId(int boardId);

    public int getSearchBoardTotalCount(SearchBoardReqDto searchBoardReqDto);

    public int saveBoard(BoardMst boardMst);

    public int setCountVisit(BoardVisitCountDto boardVisitCountDto);

}

