import style from './footer.module.css'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.container1}>
                <div className={style.titleDiv}>
                    <Link to="/" className={style.title}>GOALDDAE</Link><br/>
                    <span className={style.content}>풋살 & 축구, 골때에서 즐기세요.</span>
                </div>
                <div className={style.notice}>
                    <span className={style.emailTitle}>EMAIL</span>
                    <span className={style.emailContent}>goalddae0718@gamil.com</span><br/><br/>
                    <span className={style.helpTitle}>HELP</span>
                    <span className={style.helpContent}>02) 000 0000 0000</span>
                </div>
            </div>
            <div className={style.container2}>
                <span className={style.addressTitle}>ADDRESS</span>
                <span className={style.addressContent}>서울특별시 강남구 역삼동</span><br/><br/>
                <span className={style.businessNumberTitle}>BUSINESS NUMBER</span>
                <span className={style.businessNumberContent}>000-0000-0000</span>
            </div>
            <div className={style.container3}>
                <span><b>이용 약관</b> | </span>
                <span><b>개인정보 처리방침</b></span><br/>
                <span><b>구장 등록</b> | </span>
                <span><b>매니저 지원</b></span><br/><br/>
                <span><b>서비스 지역</b></span><br/>
                <span>전국 어디서나 <b>골때</b>를 통해 <b>풋살</b>과 <b>축구</b>를 즐길 수 있습니다.</span>
            </div>
            <div className={style.copyrightDiv}>
                <span>Copyright <b>GOALDDAE</b> All rights reserved.</span>
            </div>
        </div>
    );
}

export default Footer;