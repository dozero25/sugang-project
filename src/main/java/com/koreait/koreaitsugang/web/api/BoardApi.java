package com.koreait.koreaitsugang.web.api;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.aop.annotation.ValidAspect;
import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.entity.BoardVisitMst;
import com.koreait.koreaitsugang.service.BoardService;
import com.koreait.koreaitsugang.web.dto.BoardDto;
import com.koreait.koreaitsugang.web.dto.CMRespDto;
import com.koreait.koreaitsugang.web.dto.SearchBoardReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardApi {

    @Autowired
    private BoardService boardService;

    @PostMapping("/all/list")
    public ResponseEntity<CMRespDto<?>> getAllBoardList(SearchBoardReqDto searchBoardReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getAllBoardList(searchBoardReqDto)));
    }

    @GetMapping("/view/{boardId}")
    public ResponseEntity<CMRespDto<?>> getViewBoard(@PathVariable("boardId") int boardId, BoardVisitMst boardVisitMst) {
        boardService.setCountVisit(boardVisitMst);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardViewByUserIdAndBoardId(boardId)));
    }

    @GetMapping("/totalCount")
    public ResponseEntity<CMRespDto<?>> getBoardTotalCount(SearchBoardReqDto searchBoardReqDto, BindingResult bindingResult) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getSearchBoardTotalCount(searchBoardReqDto)));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/write")
    public ResponseEntity<CMRespDto<?>> setSaveBoard(@Valid @RequestBody BoardMst boardMst, BindingResult bindingResult) {
        boardService.setSaveBoard(boardMst);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @GetMapping("/visit")
    public ResponseEntity<CMRespDto<?>> getBoardVisit(BoardDto boardDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardVisit(boardDto.getBoardId())));
    }

}
