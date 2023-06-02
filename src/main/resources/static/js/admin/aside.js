window.onload = () => {
    AsideService.getInstance().loadAside();
}


class AsideService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AsideService();
        }
        return this.#instance;
    }

    loadAside(){
        const asideContainer = document.querySelector(".left-aside");

        asideContainer.innerHTML += `
        <div class="aside-title">
            <h1 class="title-text-h1"> <a href="/admin/main">관리자 시스템</a></h1>
        </div>
        <nav class="main-menu">
            <h2 class="title-text-h2">수강정보관리</h2>
            <ul class="sub-menu">
                <a href="/admin/search"><li>강의정보 조회</li></a>
                <a href="/admin/sugang"><li>강의정보 등록</li></a>
            </ul>
            <h2 class="title-text-h2">회원정보관리</h2>
            <ul class="sub-menu">
                <a href="/admin/usersearch"><li>회원정보 조회</li></a>
                <a href="/admin/userregister"><li>학생정보 등록</li></a>
                <a href="/admin/professorregister"><li>교수정보 등록</li></a>
            </ul>
        </nav>
        <div class="title-backhome">
            <a href="/index" class="backhome-text">메인페이지</a>
        </div>
        `;
    }

}