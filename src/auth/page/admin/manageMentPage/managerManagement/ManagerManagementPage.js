import commonStyle from "../ManageMentPage.module.css"
import ManagerTable from "./ManagerTable";


const ManagerManagement = () => {

    return (
        <div className={commonStyle.container}>
            <h1>매니저관리</h1>
            <div className={commonStyle.gridDiv}>
                <ManagerTable /> 
            </div>
        </div>
    )
}

export default ManagerManagement;