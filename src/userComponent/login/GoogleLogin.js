import styles from "./login.module.css";

const GoogleLogin = () => {

    return (
        <div  className={styles.googleBtnDiv}>
            <a href="http://localhost:8080/oauth2/authorization/google"  className={styles.googleBtn}>
                <img src="./img/googleLoginIcon_blue.Webp" />
            </a>
        </div>
    );
}

export default GoogleLogin;