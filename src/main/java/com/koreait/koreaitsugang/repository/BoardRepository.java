package com.koreait.koreaitsugang.repository;

import com.koreait.koreaitsugang.web.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardRepository {

    public List<BoardDto> getAllBoardList(BoardDto boardDto);

    public BoardDto getBoardViewByUserIdAndBoardId(int boardId);
}
