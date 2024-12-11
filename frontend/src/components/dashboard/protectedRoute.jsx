
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {token} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate("/login");
        }
    },[token,navigate]);

    if (!token) {
        return <div>Loading...</div>; // Replace with a spinner or appropriate UI
    }

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;
