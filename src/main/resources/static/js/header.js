
class HeaderApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HeaderApi();
        }
        return this.#instance;
    }

    getloadUser() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `  ${PrincipalApi.getInstance().getPrincipal().user.userId != null
                        ? `
                        http://localhost:8000/api/account/${PrincipalApi.getInstance().getPrincipal().user.userId}
                        `
                        : `
                        http://localhost:8000/index.html
                        `
                    }`
                    ,
            dataType: "json",
            success: responese => {
                returnData = responese.data;
            }, 
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }
}

class HeaderService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HeaderService();
        }
        return this.#instance;
    }

    loadHeader() {
        const headerContainer = document.querySelector(".header-container");
        const principal = PrincipalApi.getInstance().getPrincipal();
        const returnData = HeaderApi.getInstance().getloadUser();

        headerContainer.innerHTML=`
        <div class="lnb wrap">
            <div class="lnb-inner">
                <h1>
                    <a href="/index"><img src="/static/image/logo.png" alt="코리아IT 대학교 수강신청"></a>
                </h1>
                <span class="school-name"><a href="/index">코리아IT 대학교 <li>KOREA-IT UNIVERSITY</li></span></a>
                <span class="sugang-date">2023학년도 1학기 수강신청</span>
            </div>
            <div class="user-info">
                <ul>
                    ${principal == null
                        ?`
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        
                        `:`
                    <li class="user"><a href="/account/mypage">${principal.user.name}<span>${principal.user.username}</span></a></li>
                    <li>${returnData.collegeName}</li>
                    <li>${returnData.category}</li>
                    <li>${returnData.grade}학년</li>
                    `
                    }
                </ul>
            </div>
        </div>
        <div class="menulist wrap">
            <li class="on"><a href="http://localhost:8000/announcement">공지사항</a></li>
            <li><a href="http://localhost:8000/course">장바구니</a></li>
            <li><a href="">수강신청</a></li>
            ${principal == null
                ?`
                <li><a href="http://localhost:8000/account/login">로그인</a></li>    
                `:`
                <li><a href="http://localhost:8000/account/login  ">로그아웃</a></li>
            `}
        </div>
            `;
    }
}