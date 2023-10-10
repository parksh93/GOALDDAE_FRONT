import styles from "./login.module.css";

const SocialLogin = () => {

    return (
        <div  className={styles.socialBtnDiv}>
            <p>SNS 계정 로그인</p>
            <a href="http://back.goalddae.shop/oauth2/authorization/google">
                <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/public/googleLoginIconMini.Webp" className={styles.googleBtn} />
            </a>
            <a href="http://back.goalddae.shop/oauth2/authorization/naver">
                <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/public/naverLoginIconCircl.Webp" className={styles.naverBtn} />
            </a>
            
        </div>
    );
}

export default SocialLogin;