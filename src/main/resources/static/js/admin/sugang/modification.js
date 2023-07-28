window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();
    
    SugangModificationService.getInstance().setSubjectCode();
    SugangModificationService.getInstance().loadCategories();
    SugangModificationService.getInstance().loadSubject();

    ComponentEvent.getInstance().addClickEventModificationButton();
}

const subjectObj = {
    subjectCode: "",
    subjectYear: "",
    subjectSemester: "",
    collegeName: "",
    category: "",
    subjectGrade: "",
    classification: "",
    subjectName: "",
    subjectClass: "",
    credit: "",
    professorId: "",
    professorName: "",
    lectureTime: "",
    building: "",
    maxPerson: ""
}

class SugangModificationApi{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangModificationApi();
        }
        return this.#instance;
    }

    getSubject() {
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/sugang/${subjectObj.subjectCode}`,
            dataType: "json",
            success: response => {
                responeseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responeseData;
    }

    getLoadCategories(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/usersearch",
            dataType: "json",
            success: responese => {
                returnData = responese.data;
                console.log(responese);
            }, 
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    modifySubject() {
        let successFlag =false;

        $.ajax({
            async: false,
            type: "patch",
            url: `http://localhost:8000/api/admin/sugang/${subjectObj.subjectCode}`,
            contentType: "application/json",
            data: JSON.stringify(subjectObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });

        return successFlag;
    }
}

class SugangModificationService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangModificationService();
        }
        return this.#instance;
    }

    setSubjectCode() {
        const URLSearch = new URLSearchParams(location.search);
        subjectObj.subjectCode = URLSearch.get("subjectCode");
    }

    loadCategories(){
        const responeseData = SugangModificationApi.getInstance().getLoadCategories();
        const categorySelect = document.querySelector(".category-select");

        categorySelect.innerHTML = ``;

        responeseData.forEach((data, index) => {
            categorySelect.innerHTML += `
                <option value = "${data.category}">${data.category}</option>
            `;
        });
    }

    loadSubject() {
        const responeseData = SugangModificationApi.getInstance().getSubject();

        const modificationInputs = document.querySelectorAll(".modification-input");
        modificationInputs[0].value = responeseData.subjectMst.subjectCode;
        modificationInputs[1].value = responeseData.subjectMst.subjectYear;
        modificationInputs[2].value = responeseData.subjectMst.subjectSemester;
        modificationInputs[3].value = responeseData.subjectMst.collegeName;
        modificationInputs[4].value = responeseData.subjectMst.category;
        modificationInputs[5].value = responeseData.subjectMst.subjectGrade;
        modificationInputs[6].value = responeseData.subjectMst.classification;
        modificationInputs[7].value = responeseData.subjectMst.subjectName;
        modificationInputs[8].value = responeseData.subjectMst.subjectClass;
        modificationInputs[9].value = responeseData.subjectMst.credit;
        modificationInputs[10].value = responeseData.subjectMst.professorId;
        modificationInputs[11].value = responeseData.subjectMst.professorName;
        modificationInputs[12].value = responeseData.subjectMst.lectureTime;
        modificationInputs[13].value = responeseData.subjectMst.building;
        modificationInputs[14].value = responeseData.subjectMst.maxPerson;
    }

    setSubjectObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input");

        subjectObj.subjectCode = modificationInputs[0].value;
        subjectObj.subjectYear = modificationInputs[1].value;
        subjectObj.subjectSemester = modificationInputs[2].value;
        subjectObj.collegeName = modificationInputs[3].value;
        subjectObj.category = modificationInputs[4].value;
        subjectObj.subjectGrade = modificationInputs[5].value;
        subjectObj.classification = modificationInputs[6].value;
        subjectObj.subjectName = modificationInputs[7].value;
        subjectObj.subjectClass = modificationInputs[8].value;
        subjectObj.credit = modificationInputs[9].value;
        subjectObj.professorId = modificationInputs[10].value;
        subjectObj.professorName = modificationInputs[11].value;
        subjectObj.lectureTime = modificationInputs[12].value;
        subjectObj.building = modificationInputs[13].value;
        subjectObj.maxPerson = modificationInputs[14].value;
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

    addClickEventModificationButton() {
        const modificationButton = document.querySelector(".modification-button");

        modificationButton.onclick = () => {
            
            SugangModificationService.getInstance().setSubjectObjValues();

            const successFlag = SugangModificationApi.getInstance().modifySubject();
            if(successFlag) {
                alert("수정 완료되었습니다.");
                location.href="/admin/sugang/search";
            } else {
                location.reload();
            }
        }  
    }
}
    