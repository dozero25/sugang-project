package com.koreait.koreaitsugang.web.api;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.security.PrincipalDetails;
import com.koreait.koreaitsugang.service.BoardService;
import com.koreait.koreaitsugang.web.dto.BoardDto;
import com.koreait.koreaitsugang.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardApi {

    @Autowired
    private BoardService boardService;

    @ParamsAspect
    @GetMapping("/all/list")
    public ResponseEntity<CMRespDto<?>> getAllBoardList(BoardDto boardDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getAllBoardList(boardDto)));
    }

    @GetMapping("/view/{boardId}")
    public ResponseEntity<CMRespDto<?>> getViewBoard(@PathVariable("boardId") int boardId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardViewByUserIdAndBoardId(boardId)));
    }




}
