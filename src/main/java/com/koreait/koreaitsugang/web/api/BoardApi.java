package com.koreait.koreaitsugang.web.api;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.aop.annotation.ValidAspect;
import com.koreait.koreaitsugang.entity.BoardMst;
import com.koreait.koreaitsugang.security.PrincipalDetails;
import com.koreait.koreaitsugang.service.BoardService;
import com.koreait.koreaitsugang.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardApi {

    @Autowired
    private BoardService boardService;

    @GetMapping("/all/list")
    public ResponseEntity<CMRespDto<?>> getAllBoardList(SearchBoardReqDto searchBoardReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getAllBoardList(searchBoardReqDto)));
    }

    @GetMapping("/view/{boardId}")
    public ResponseEntity<CMRespDto<?>> getViewBoard(@PathVariable("boardId") int boardId, BoardVisitCountDto boardVisitCountDto) {
        boardService.setCountVisit(boardVisitCountDto);
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

    @ParamsAspect
    @ValidAspect
    @PatchMapping("/update/{boardId}")
    public ResponseEntity<CMRespDto<?>> modifyBoard(@PathVariable("boardId") int boardId, @Valid @RequestBody BoardMst boardMst, BindingResult bindingResult){
        boardService.modifyBoard(boardMst);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));    }

    @GetMapping("/update/view/{boardId}")
    public ResponseEntity<CMRespDto<?>> getUpdateViewBoard(@PathVariable("boardId") int boardId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardUpdateViewByUserIdAndBoardId(boardId)));
    }

    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<CMRespDto<?>> deleteBoard(@PathVariable int boardId) {
        boardService.deleteBoardByBoardId(boardId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @GetMapping("/get/category")
    public ResponseEntity<CMRespDto<?>> getBoardCategory() {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.boardCategory()));
    }

    @GetMapping("/list/{boardGrp}")
    public ResponseEntity<CMRespDto<?>> getBoardListByBoardGrp(@PathVariable("boardGrp") int boardGrp, SearchBoardGrpReqDto searchBoardGrpReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardListByBoardGrp(searchBoardGrpReqDto)));
    }

    @GetMapping("/count/{boardGrp}")
    public ResponseEntity<CMRespDto<?>> getSearchBoardCountByBoardGrp(@PathVariable("boardGrp") int boardGrp, SearchBoardGrpReqDto searchBoardGrpReqDto, BindingResult bindingResult) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getSearchBoardCountByBoardGrp(searchBoardGrpReqDto)));
    }

    @PostMapping("/view")
    public ResponseEntity<CMRespDto<?>> saveBoardReply(@Valid @RequestBody BoardReplyDto boardReplyDto,BindingResult bindingResult ,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        boardService.inputBoardReplyByBoardId(boardReplyDto);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @PostMapping("/view/rep/{boardReplyFir}")
    public ResponseEntity<CMRespDto<?>> saveBoardReplySec(@PathVariable("boardReplyFir") int boardReplyFir, @Valid @RequestBody BoardReplyDto boardReplyDto,BindingResult bindingResult ,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        boardService.inputBoardReplySecByBoardId(boardReplyDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @PostMapping(value = "/view/rep/{boardReplyFir}/{boardReplySec}")
    public ResponseEntity<CMRespDto<?>> saveBoardReplyThi(@PathVariable(value = "boardReplyFir") int boardReplyFir, @PathVariable(value = "boardReplySec") int boardReplySec, @Valid @RequestBody BoardReplyDto boardReplyDto,BindingResult bindingResult ,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        boardService.inputBoardReplyThiByBoardId(boardReplyDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @GetMapping("/view/reply/{boardId}")
    public ResponseEntity<CMRespDto<?>> getBoardReply(@PathVariable("boardId") int boardId) {

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", boardService.getBoardReplyByBoardId(boardId)));
    }
}