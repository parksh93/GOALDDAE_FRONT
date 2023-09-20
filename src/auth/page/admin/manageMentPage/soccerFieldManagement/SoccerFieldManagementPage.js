import commonStyle from "../ManageMentPage.module.css"
import SoccerFieldAdd from "./SoccerFieldAdd";
import SoccerFieldUpdate from "./SoccerFieldUpdate";
import SoccerFieldTable from "./SoccerFieldTable";
import  {useState} from 'react';


const SoccerFieldManagement = () => {
    const [pageState, setPageState] = useState(0);
    const [selectSoccerField, setSelectSoccerField] = useState(null);

    return (
        <div className={commonStyle.container}>
            <h1>구장관리</h1>
            <div className={commonStyle.gridDiv}>
                {pageState === 0? 
                <SoccerFieldTable setPageState={setPageState} setSelectSoccerField={setSelectSoccerField}/>
                :pageState === 1 ?<SoccerFieldAdd setPageState={setPageState}/>
                : <SoccerFieldUpdate selectSoccerField={selectSoccerField} setSelectSoccerField={setSelectSoccerField} setPageState={setPageState}/>
                }
            </div>
        </div>
    )
}

export default SoccerFieldManagement;