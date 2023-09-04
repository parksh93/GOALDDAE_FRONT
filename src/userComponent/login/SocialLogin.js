import styles from "./login.module.css";

const SocialLogin = () => {

    return (
        <div  className={styles.socialBtnDiv}>
            <p>SNS 계정 로그인</p>
            <a href="http://localhost:8080/oauth2/authorization/google">
                <img src="./img/googleLoginIconMini.Webp" className={styles.googleBtn} />
            </a>
            <a href="http://localhost:8080/oauth2/authorization/naver">
                <img src="./img/naverLoginIconCircl.Webp" className={styles.naverBtn} />
            </a>
            
        </div>
    );
}

export default SocialLogin;