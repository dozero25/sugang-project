window.onload = () => {
    HeaderService.getInstance().loadHeader();

    SearchService.getInstance().loadCategories();
    SearchService.getInstance().clearCourseList();
    SearchService.getInstance().loadOpenCourse();
    SearchService.getInstance().loadCourseList();
    SearchService.getInstance().loadCredit();
    SearchService.getInstance().getLoadPocketInfo();

    ComponentEvent.getInstance().addClickEventCategoryRadios();
    ComponentEvent.getInstance().addClickEventSearchButton();
    
}

const searchObj = {
    page: 1,
    classification: new Array(),
    searchValue: "",
    limit: "Y",
    count: 5
}

const subjectCode = new Array();

class SearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
        }
        return this.#instance;
    }

    getCategories() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/sugang/classification",
            dataType: "json",
            success : response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        }); 
        return returnData;
    }

    getTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/sugang/search/total",
            data: {
                "classification" : searchObj.classification,
                "searchValue" : searchObj.searchValue
            },
            dataType: "json",
            success: response => {
                 returnData = response.data;
                 
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    getOpenCourse(searchObj) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/sugang/all/course",
            data: searchObj,
            dataType: "json",
            success : response => {
                responseData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return responseData;
    }

    applyCourse(pocketObj){
        let responseData = null;

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/sugang/apply`,
            contentType: "application/json",
            data: JSON.stringify(pocketObj),
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
                alert("중복된 과목 입니다.");
                location.reload()
            }
        });
        return responseData;
    }

    deleteCourse(pocketObj) {
        let returnData = pocketObj;

        $.ajax({
            async: false,
            type: "delete",
            url: 'http://localhost:8000/api/sugang/delete',
            contentType: "application/json",
            data: JSON.stringify(pocketObj),
            dataType:"json",
            success : response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    subloadCourse(pocketObj){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/sugang/load`,
            data: pocketObj,
            dataType: "json",
            success: response => {
                console.log(response);
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getLoadCreditInfo(){
        let responseData = null;

        $.ajax({
            async:false,
            type:"get",
            url:"/api/sugang/credit",
            data:"json",
            success : response => {
                responseData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getInfoPocketCredit(){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url : "/api/sugang/credit/info",
            data:"json",
            success : response =>{
                responseData = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}
class SearchService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
    }

    loadCategories() {
        const classificationList = document.querySelector(".info");
        classificationList.innerHTML = ``;

        const responseData = SearchApi.getInstance().getCategories();
        responseData.forEach((classificationObj,index) => {
            classificationList.innerHTML += `
                <input type="radio" class="info-radio" name="openCourse" id="${classificationObj.classification}" value="${classificationObj.classification}">
                <label for="${classificationObj.classification}">${classificationObj.classification}</label>
            `;

            if(responseData.length -1 == index) {
                classificationList.innerHTML += `
                    <input type="radio" class="info-radio" name="openCourse" id="${classificationObj}" value="${classificationObj}">
                    <label for="${classificationObj}">장바구니</label>
                `;
            }
        });

    }

    loadPageController() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = SearchApi.getInstance().getTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0
                            ? Math.floor(totalCount / searchObj.count)
                            : Math.floor(totalCount / searchObj.count) + 1;

        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if(searchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page--;
                subjectCode.splice(0, subjectCode.length);
                this.loadOpenCourse();
                

            
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                
                subjectCode.splice(0, subjectCode.length);
                this.loadOpenCourse();
                
            }
        }

        const startIndex = searchObj.page % 5 == 0
                        ? searchObj.page - 4
                        : searchObj.page - (searchObj.page % 5) + 1;

        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;

        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)"class ="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {
            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    subjectCode.splice(0, subjectCode.length);
                    this.loadOpenCourse();
                    
                    
                }
            }
        });
    }

    clearCourseList(){
        const pageController = document.querySelector(".opened-table tbody");
        pageController.innerHTML = "";
    }

    clearloadCourseList(){
            const pageController = document.querySelector(".confirmed-table tbody");
            pageController.innerHTML = "";
       }


    loadOpenCourse() {
        const responseData = SearchApi.getInstance().getOpenCourse(searchObj);
        const openTable = document.querySelector(".opened-table tbody");

        openTable.innerHTML = ``;

        responseData.forEach((data, index) => {
            subjectCode.push(data);
            openTable.innerHTML +=`
            <tr>
                <td><button type="submit" class="submit-button1" value=${data.subjectCode}>신청</button></td>
                <td>${data.classification}</td>
                <td>${data.subjectCode}</td>
                <td>${data.subjectName}</td>
                <td>${data.credit}</td>
                <td>${data.professorName}</td>
                <td>${data.building} / ${data.lectureTime}</td>
                <td></th>
                <td>Y</th>
                <td></th>
            </tr>
            `;
        });
        this.loadPageController();
        ComponentEvent.getInstance().addClickApplyCourseButton();
        
    }

    loadCourseList(){
        const responseData = SearchApi.getInstance().subloadCourse();

        const openTable = document.querySelector(".confirmed-table tbody");

        openTable.innerHTML = ``;

        responseData.forEach((data, index) => {
            subjectCode.push(data);
            
            openTable.innerHTML +=`
            <tr>
                <td><button type="button" class="delete-button">삭제</button></td>
                <td>${data.classification}</td>
                <td>${data.subjectCode}</td>
                <td>${data.subjectName}</td>
                <td>${data.credit}</td>
                <td>${data.professorName}</td>
                <td>${data.building} / ${data.lectureTime}</td>
                <td>N</th>
            </tr>
            `;
            ComponentEvent.getInstance().deleteCourseButton();
        });
        
    }

    
    loadCredit(){
        const responseData = SearchApi.getInstance().getLoadCreditInfo();

        const openCreditTable = document.querySelector(".grade-container");

        openCreditTable.innerHTML = ``;

        openCreditTable.innerHTML += `
        <table class="grade-table">
                <tr>
                    <td class="grade-text-first">
                        직전학기 신청학점
                    </td>
                    <td>
                        ${responseData.pastCredit}
                    </td>
                </tr>
                <tr>
                    <td class="grade-text-first">
                        직전학기 평균학점
                    </td>
                    <td>
                        ${responseData.pastAvg}
                    </td>
                </tr>
                <tr>
                    <td class="grade-text-first">
                        총 취득학점
                    </td>
                    <td>
                        ${responseData.maxCredit}
                    </td>
                </tr>
                <tr>
                    <td  class="grade-text-first">
                        신청가능학점
                    </td>
                    <td>
                        ${responseData.presentCredit}
                    </td>
                </tr>
            </table>
        
        `;
    }

    getLoadPocketInfo(){
        const pocketInfo = document.querySelector(".course-count");
        const responeseData = SearchApi.getInstance().getInfoPocketCredit();

        pocketInfo.innerHTML = `
            <span class="course-title">장바구니 내역</span>
            <span class="course-count">
                <span class="proposal-text">신청학점 : </span>
                <span class="proposal-text">${responeseData.totalCreditSum} 학점</span>
                <span class="proposal-text"> / </span>
                <span class="proposal-text">신청과목수 : </span>
                <span class="proposal-text">${responeseData.totalCreditCount} 개</span>
            </span>
        `;
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventCategoryRadios() {
        const radios = document.querySelectorAll(".info-radio");
        radios.forEach(radio => {
            radio.onclick = () => {
                searchObj.classification.splice(0);
                if(radio.checked) {
                    searchObj.classification.push(radio.value);
                    while(subjectCode.length != 0) {
                        subjectCode.pop(0);
                    }

                    SearchService.getInstance().loadOpenCourse();
                    
                }
                else {
                    const index = searchObj.classification.indexOf(radio.value);
                    searchObj.classification.splice(index, 1);
                    SearchService.getInstance().clearCourseList();
                }
            }
        });
    }

    addClickApplyCourseButton() {
        const inputApplyCourse = document.querySelectorAll(".submit-button1");
        const inputCourseTable = document.querySelector(".confirmed-table tbody");
        const principal = PrincipalApi.getInstance().getPrincipal().user.userId;

        inputApplyCourse.forEach((button, index) => {
            button.onclick = () => {
                subjectCode[index].userId = principal;
                const applyData = SearchApi.getInstance().applyCourse(subjectCode[index]);
                console.log(subjectCode[index]);
                inputCourseTable.innerHTML = `
                <tr>
                    <td><button type="button" class="delete-button">삭제</button></td>
                    <td>${applyData.classification}</td>
                    <td>${applyData.subjectCode}</td>
                    <td>${applyData.subjectName}</td>
                    <td>${applyData.credit}</td>
                    <td>${applyData.professorName}</td>
                    <td>${applyData.building} / ${applyData.lectureTime}</td>
                    <td>N</th>
                </tr>
                `;
                console.log(applyData.subjectCode);
                SearchService.getInstance().loadOpenCourse();
                SearchService.getInstance().loadCourseList();
                SearchService.getInstance().getLoadPocketInfo();
                ComponentEvent.getInstance().deleteCourseButton();
            }
        });
    }

    deleteCourseButton(){
        const deletebutton = document.querySelectorAll(".delete-button");
        const outCourseTable = document.querySelector(".confirmed-table tbody");

        deletebutton.forEach((button, index) => {
            button.onclick= () => {
                subjectCode[index].userId = PrincipalApi.getInstance().getPrincipal().user.userId;
                const deleteData = SearchApi.getInstance().deleteCourse(subjectCode[index]);

                outCourseTable.outerHTML = `
                <tr>
                    <td><button type="button" class="delete-button">삭제</button></td>
                    <td>${deleteData.classification}</td>
                    <td>${deleteData.subjectCode}</td>
                    <td>${deleteData.subjectName}</td>
                    <td>${deleteData.credit}</td>
                    <td>${deleteData.professorName}</td>
                    <td>${deleteData.building} / ${deleteData.lectureTime}</td>
                    <td>N</th>
                </tr>
                `;

                SearchService.getInstance().loadCourseList();
                location.reload(true);
            };
        });


    }
    
    addClickEventSearchButton() {
        const classificationList = document.querySelector(".info");
        const searchInput = document.querySelector(".subject-code-select");
        const searchButton = document.querySelector(".select-button");

        searchButton.onclick = () => {
            searchObj.category = classificationList.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;

            SearchService.getInstance().loadOpenCourse();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }
}

