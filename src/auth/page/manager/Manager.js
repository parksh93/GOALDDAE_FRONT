import { useUser } from "../../../userComponent/userContext/UserContext";
import ManagerComponent from "./ManagerComponent"

const Manager = () => {

    const { userInfo } = useUser();


    return (
        <div>
            {userInfo &&
            <ManagerComponent managerId={userInfo.id} />    
            }            
        </div>
    );
}

export default Manager;