import commonStyle from "../ManageMentPage.module.css"
import UserTable from "./UserTable";


const UserManagement = () => {

    return (
        <div className={commonStyle.container}>
            <h1>사용자관리</h1>
            <div className={commonStyle.gridDiv}>
                <UserTable /> 
            </div>
        </div>
    )
}

export default UserManagement;