
import { endpoint,heroendpoint, projectEndpoint } from "../apis"
import { apiConnector } from "../apiConnector"
import { toast } from "sonner"
import { setUser, setLoading, setToken } from "../../redux/slice/authSlice.js"
import { setProfile, setProjects } from "../../redux/slice/applicationSlice.js"
import { contactAdminEndpoint } from "../apis"

const {
    LOGIN_API,

} = endpoint

const {UPDATE_HERO_API} = heroendpoint;

const {
    CREATE_PROJECT_API,
    GET_PROJECT_API,
    UPDATE_PROJECT_API,
    DELETE_PROJECT_API

}=projectEndpoint

const {
    CONTACT_ADMIN_API
}=contactAdminEndpoint




export function login(email, password, navigate) {
    return async (dispatch) => {

        // console.log(email,password,"INSIDE THE LOGIN API.....") //DATA AA RHA HAI 

        dispatch(setLoading(true))

        try {

            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })
            
            // console.log(response,"PRINTING RESPONSE ")

            // console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")

            dispatch(setToken(response?.data?.token))

            // localStorage.setItem("token", JSON.stringify(response.data.token))

            dispatch(setUser(response?.data?.user))
            
            navigate("/dashboard/herosection")

        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
    }
}



export function updateProfile(title,myself,token) {
    return async (dispatch) => {

        // console.log(title,myself,"INSIDE THE update profile API.....") //DATA AA RHA HAI 

        dispatch(setLoading(true))

        try {

            const response = await apiConnector("PUT", UPDATE_HERO_API, {
                title,
                myself,
            },{ Authorization: `Bearer ${token}` }

        )
            
            // console.log(response.data.data,"PRINTING RESPONSE....... ")

            // console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Updated Successfull")

            // console.log("SHowing DATA.....",response.data.data)


            dispatch(setProfile(response.data.data))
            
            // navigate("/dashboard/herosection")

            dispatch(setLoading(false))

        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response?.data?.message)
            dispatch(setLoading(false))
        }
        dispatch(setLoading(false))
    }
}



export function createProject(formData, token,projects, navigate) {
    return async (dispatch) => {
        // console.log([...formData.entries()], "FormData being sent");

        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                CREATE_PROJECT_API,
                formData, // Pass formData
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );

            // console.log(response.data, "API Response");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

             // Get the current state of projects

            //  console.log(projects)

             // Append the new project to the existing list
             const updatedProjects = [...projects, response.data.data];

            dispatch(setProjects(updatedProjects));

            navigate("/dashboard/editprojects")
            dispatch(setLoading(false));

        } catch (error) {
            dispatch(setLoading(false));
            console.error("API Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
}




export function updateProject(formData, token , paramsId , navigate) {
    return async (dispatch) => {

        // console.log(paramsId)

        // console.log([...formData.entries()], "FormData being sent");
        dispatch(setLoading(true));

        const url = `${UPDATE_PROJECT_API}/${paramsId}`;

        try {
            const response = await apiConnector(
                "PUT",
                url,
                formData, // Pass formData
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                
                
            );

            // console.log(response, "API Response.......");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

             // Get the current state of projects

            //  console.log(projects)
             // Append the new project to the existing list
            //  const updatedProjects = [...projects, response.data.data];

            // dispatch(setProjects(updatedProjects));
            navigate("/dashboard/editprojects");
            dispatch(setLoading(false));

        } catch (error) {
            dispatch(setLoading(false));
            console.error("API Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export function deleteProject(projectId, token,) {
    return async (dispatch) => {
     
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                DELETE_PROJECT_API,
               { projectId}, // Pass formData
                {     
                    Authorization: `Bearer ${token}`,
                }
            );

            // console.log(response.data, "API Response");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

             // Get the current state of projects

            //  console.log(response)

             // Append the new project to the existing list
             

            dispatch(setProjects(response.data.projects));

        } catch (error) {
            console.error("API Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export function contactAdmin(name,email,message,token) {
    return async (dispatch) => {
     
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                CONTACT_ADMIN_API,
                {name,email,message}, // Pass
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            // console.log(response.data, "API Response");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

        } catch (error) {
            console.error("API Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
}





export function logout(navigate) {
    return (dispatch) => {
        // console.log("clicked on Logout")
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setProjects(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/login")
    }
  }