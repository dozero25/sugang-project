
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
                        http://localhost:8000/api/account/${PrincipalApi.getInstance().getPrincipal().user.userId}`
                        : `
                        http://localhost:8000/announcement.html
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
                    <a href="/announcement"><img src="/static/image/logo.png" alt="코리아IT 대학교 수강신청"></a>
                </h1>
                <span class="school-name"><a href="/announcement">코리아IT 대학교 <li>KOREA-IT UNIVERSITY</li></span></a>
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
            <li class="on"><a href="/announcement">공지사항</a></li>
            <li><a href="">강의시간표</a></li>
            <li><a href="http://localhost:8000/course">장바구니</a></li>
            <li><a href="">수강신청</a></li>
            <li><a href="">학점이수현황</a></li>
            <li><a href="">재수강신청</a></li>
            <li><a href="">재수강내역</a></li>
            <li><a href="">강의평가</a></li>
            <li><a href="">매뉴얼</a></li>
            ${principal == null
                ?`
                <li><a href="/user/login">로그인</a></li>    
                `:`
                <li><a href="/logout">로그아웃</a></li>
            `}
        </div>
            `;
    }
}