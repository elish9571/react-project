import Login from "../login/Login"
import AppStore from '../../store/AppStore';
import { observer } from "mobx-react"
import AdminHomePage from "./AdminHomePage";
const Admin = (observer(() => {
    return (
        <>
            {AppStore.isLogin===null?
                <Login /> :
               <> <AdminHomePage/>
               </>
            }
        </>
    )
}
))
export default Admin