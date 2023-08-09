import style from './css/footer.module.css'

function Footer() {
    return (
        <div>
            <div className={style.footer}>
                <div>
                    <span className={style.title}>GOALDDAE</span><br/>
                    <span className={style.content}>풋살 & 축구, 골때에서 즐기세요.</span>
                </div>
                <div className={style.notice}>
                    <span className={style.emailTitle}>EMAIL</span><br/>
                    <span className={style.emailCotnent}>goalddae0718@gamil.com</span><br/>
                    <span className={style.helpTitle}>HELP</span><br/>
                    <span className={style.helpContent}>02) 000 0000 0000</span>
                </div>
            </div>
            <img src='./img/glass.png' className={style.glassImg}/>
        </div>

    )
}

export default Footer;