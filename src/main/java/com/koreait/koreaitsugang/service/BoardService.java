package com.koreait.koreaitsugang.service;

import com.koreait.koreaitsugang.repository.BoardRepository;
import com.koreait.koreaitsugang.web.dto.BoardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;


    public List<BoardDto> getAllBoardList(BoardDto boardDto){
        return boardRepository.getAllBoardList(boardDto);
    }

    public BoardDto getBoardViewByUserIdAndBoardId(int boardId) {
        return boardRepository.getBoardViewByUserIdAndBoardId(boardId);
    }

}
