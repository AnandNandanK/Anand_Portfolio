const BASE_URL="http://localhost:4000/api/v1/"


export const endpoint={
    LOGIN_API:BASE_URL+ "admin/login",
    VERYFY_TOKEN_API:BASE_URL+ "admin/verify",
}

export const heroendpoint={
    GET_HERO_API:BASE_URL+ "hero/get",
    UPDATE_HERO_API:BASE_URL+ "hero/update",
}

export const projectEndpoint={
    CREATE_PROJECT_API:BASE_URL+ "project/create",
    GET_PROJECT_API:BASE_URL+ "project/get",
    GET_PROJECT_BY_ID_API:BASE_URL+ "project/get",
    UPDATE_PROJECT_API:BASE_URL+ "project/update", 
    DELETE_PROJECT_API:BASE_URL+ "project/delete",
}

export const contactAdminEndpoint={
    CONTACT_ADMIN_API:BASE_URL+ "admin/contactme",
 
}