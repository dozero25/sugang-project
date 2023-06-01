window.onload = () => {
    HeaderService.getInstance().loadHeader();

    SearchService.getInstance().loadCategories();
    SearchService.getInstance().clearCourseList();
    SearchService.getInstance().loadCourseList();

    ComponentEvent.getInstance().addClickEventCategoryRadios();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().deleteCourseButton();

    
}

const searchObj = {
    page: 1,
    classification: new Array(),
    searchValue: null,
    limit: "Y",
    count: 8
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
                 console.log(response);
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
            type: "get",
            url: "http://localhost:8000/api/sugang/open",
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
                console.log(response);
            },
            error: error => {
                console.log(error);
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
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    loadCourse(pocketObj){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/sugang/load`,
            data: pocketObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
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
                <td><button type="submit" class="submit-button1">신청</button></td>
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

    loadPageController() {
        const pageController = document.querySelector(".page-controller");
        pageController.innerHTML = "";

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
                this.loadOpenCourse();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
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
                    this.loadOpenCourse();
                }
            }
        });
    }

    loadCourseList(){
        const responseData = SearchApi.getInstance().loadCourse();

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
        });
        
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


        inputApplyCourse.forEach((button, index) => {
            button.onclick = () => {
                subjectCode[index].userId = PrincipalApi.getInstance().getPrincipal().user.userId;
                const applyData = SearchApi.getInstance().applyCourse(subjectCode[index]);

                inputCourseTable.innerHTML += `
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
                SearchService.getInstance().loadOpenCourse();
                SearchService.getInstance().loadCourseList();

            }
        });
    }

    deleteCourseButton(){
        const deletebutton = document.querySelectorAll(".delete-button");
        const outCourseTable = document.querySelector(".confirmed-table tbody");

        deletebutton.forEach((buttons, index) => {
            buttons.onclick= () => {
                subjectCode[index].userId = PrincipalApi.getInstance().getPrincipal().user.userId;
                const deleteData = SearchApi.getInstance().deleteCourse(subjectCode[index]);

                outCourseTable.outerHTML = `
                <tr id="confirmed-body">
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

