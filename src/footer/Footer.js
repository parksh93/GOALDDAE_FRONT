import style from './Footer.module.css'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.container1}>
                <div className={style.titleDiv}>
                    <span className={style.title}><Link to="/" className={style.title}>GOALDDAE</Link></span><br/>
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
            <div className={style.copyrightDiv}>
                <span>Copyright <b>GOALDDAE</b> All rights reserved.</span>
            </div>
        </div>
    );
}

export default Footer;