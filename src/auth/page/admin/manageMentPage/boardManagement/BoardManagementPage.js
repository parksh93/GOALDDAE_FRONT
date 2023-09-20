import commonStyle from "../ManageMentPage.module.css"
import BoardTable from "./BoardTable";
import ReplyTable from "./ReplyTable";


const BoardManagement = () => {

    return (
        <div className={commonStyle.container}>
            <h1>게시글관리</h1>
            <div className={commonStyle.gridDiv}>
                <BoardTable /> 
            </div>
            <br/>
            <br/>
            <br/>
            <h1>댓글관리</h1>
            <div className={commonStyle.gridDiv}>
                <ReplyTable /> 
            </div>

        </div>
    )
}

export default BoardManagement;