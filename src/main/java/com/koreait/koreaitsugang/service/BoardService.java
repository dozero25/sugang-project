package com.koreait.koreaitsugang.service;

import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.repository.BoardRepository;
import com.koreait.koreaitsugang.web.dto.*;
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

    public int setSaveBoard(BoardMst boardMst) {
        return boardRepository.saveBoard(boardMst);
    }

    public int setCountVisit(BoardVisitCountDto boardVisitCountDto){
        return boardRepository.setCountVisit(boardVisitCountDto);
    }

    public int modifyBoard(BoardMst boardMst) {
        return boardRepository.updateBoardByBoardId(boardMst);
    }

    public BoardDto getBoardUpdateViewByUserIdAndBoardId(int boardId) {
        return boardRepository.getBoardUpdateViewByUserIdAndBoardId(boardId);
    }

    public void deleteBoardByBoardId(int boardId) {
        boardRepository.deleteBoard(boardId);
    }

    public List<BoardCategoryDto> boardCategory(){
        return boardRepository.boardCategory();
    }

    public List<BoardDto> getBoardListByBoardGrp(SearchBoardGrpReqDto searchBoardGrpReqDto){
        searchBoardGrpReqDto.setIndex();
        return boardRepository.getBoardListByBoardGrp(searchBoardGrpReqDto);
    }

    public int getSearchBoardCountByBoardGrp(SearchBoardGrpReqDto searchBoardGrpReqDto){
        return boardRepository.getSearchBoardCountByBoardGrp(searchBoardGrpReqDto);
    }

    public void inputBoardReplyByBoardId(BoardReplyDto boardReplyDto){

        boardReplyDto.setBoardReplyFir(boardRepository.getReplyCount());
        boardReplyDto.setBoardReplyFir(boardReplyDto.getBoardReplyFir());
        boardReplyDto.setBoardReplySec(boardReplyDto.getBoardReplySec() + 1);
        boardReplyDto.setBoardReplyThi(boardReplyDto.getBoardReplyThi() + 1);
        boardRepository.inputBoardReplyByBoardId(boardReplyDto);
    }

    public void inputBoardReplySecByBoardId(BoardReplyDto boardReplyDto){
        boardReplyDto.setBoardReplySec(boardRepository.getReplySecCount(boardReplyDto.getBoardReplyFir()));
        boardReplyDto.setBoardReplyFir(boardReplyDto.getBoardReplyFir());
        boardReplyDto.setBoardReplySec(boardReplyDto.getBoardReplySec());
        boardReplyDto.setBoardReplyThi(boardReplyDto.getBoardReplyThi() + 1);
        boardRepository.inputBoardReplyByBoardId(boardReplyDto);
    }

    public void inputBoardReplyThiByBoardId(BoardReplyDto boardReplyDto){
        boardReplyDto.setBoardReplyThi(boardRepository.getReplyThiCount(boardReplyDto.getBoardReplyFir(), boardReplyDto.getBoardReplySec()));
        boardReplyDto.setBoardReplyFir(boardReplyDto.getBoardReplyFir());
        boardReplyDto.setBoardReplySec(boardReplyDto.getBoardReplySec());
        boardReplyDto.setBoardReplyThi(boardReplyDto.getBoardReplyThi());
        boardRepository.inputBoardReplyByBoardId(boardReplyDto);
    }

    public List<BoardReplyDto> getBoardReplyByBoardId(int boardId){
        return boardRepository.getBoardReplyByBoardId(boardId);
    }

}
