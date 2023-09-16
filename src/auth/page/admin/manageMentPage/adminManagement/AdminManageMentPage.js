import commonStyle from "../ManageMentPage.module.css"
import AdminTable from "./AdminTable";


const AdminManagement = () => {

    return (
        <div className={commonStyle.container}>
            <h1>관리자관리</h1>
            <div className={commonStyle.gridDiv}>
                <AdminTable /> 
            </div>
        </div>
    )
}

export default AdminManagement;