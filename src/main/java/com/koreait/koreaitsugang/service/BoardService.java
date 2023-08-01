package com.koreait.koreaitsugang.service;

import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.entity.BoardVisitMst;
import com.koreait.koreaitsugang.repository.BoardRepository;
import com.koreait.koreaitsugang.web.dto.BoardDto;
import com.koreait.koreaitsugang.web.dto.BoardVisitDto;
import com.koreait.koreaitsugang.web.dto.SearchBoardReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;


    public List<BoardDto> getAllBoardList(SearchBoardReqDto searchBoardReqDto){
        searchBoardReqDto.setIndex();
        return boardRepository.getAllBoardList(searchBoardReqDto);
    }

    public BoardDto getBoardViewByUserIdAndBoardId(int boardId) {
        return boardRepository.getBoardViewByUserIdAndBoardId(boardId);
    }

    public int getSearchBoardTotalCount(SearchBoardReqDto searchBoardReqDto){
        return boardRepository.getSearchBoardTotalCount(searchBoardReqDto);
    }

    public int setSaveBoard(BoardMst boardMst){
        return boardRepository.saveBoard(boardMst);
    }

    public void setCountVisit(BoardVisitMst boardVisitMst){
        boardVisitMst.setBoardVisit(boardVisitMst.getBoardVisit());
        boardRepository.setCountVisit(boardVisitMst.getBoardId());
    }

    public List<BoardVisitDto> getBoardVisit(int boardId){
        return boardRepository.getBoardVisit(boardId);
    }

}
