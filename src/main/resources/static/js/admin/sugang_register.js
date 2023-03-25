window.onload = () => {
    SugangRegisterService.getInstance().loadCategories();
    ComponentEvent.getInstance().addClickEventRegisterButton();
}

const subjectObj = {
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

class SugangRegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangRegisterApi();
        }
        return this.#instance;
    }

    registerSugang() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/sugang",
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

    getCategories() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin",
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

class SugangRegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangRegisterService();
        }
        return this.#instance;
    }

    setSubjectObjValues() {
        const registerInputs = document.querySelectorAll(".register-input");
        subjectObj.subjectYear = registerInputs[0].value;
        subjectObj.subjectSemester = registerInputs[1].value;
        subjectObj.collegeName = registerInputs[2].value;
        subjectObj.category = registerInputs[3].value;
        subjectObj.subjectGrade = registerInputs[4].value;
        subjectObj.classification = registerInputs[5].value;
        subjectObj.subjectName = registerInputs[6].value;
        subjectObj.subjectClass = registerInputs[7].value;
        subjectObj.credit = registerInputs[8].value;
        subjectObj.professorId = registerInputs[9].value;
        subjectObj.professorName = registerInputs[10].value;
        subjectObj.lectureTime = registerInputs[11].value;
        subjectObj.building = registerInputs[12].value;
        subjectObj.maxPerson = registerInputs[13].value;
    }

    loadCategories() {
        const responeseData = SugangRegisterApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");

        responeseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data}">${data}</option>
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

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            SugangRegisterService.getInstance().setSubjectObjValues();
            const successFlag = SugangRegisterApi.getInstance().registerSugang();
            
            if(successFlag) {
                alert("등록이 완료되었습니다.");
                location.href="http://127.0.0.1:5501/templates/admin/sugang_information.html";
            } else {
                location.reload();
            }
        }
    }
}