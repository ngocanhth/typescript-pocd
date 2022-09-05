export interface LoginPayload {
    email: string,
    password: string
}
export interface LoginResponse {
    id: string | undefined;
    first_name: string;
    last_name: string;
    access_token: string;
    refresh_token: string;
}
export interface User {
    id: string | undefined;
    first_name: string;
    last_name: string;
    access_token: string;
    refresh_token: string;
}

export interface UserDetail {
    id: string | undefined;
    first_name: string;
    last_name: string;
    fullname: string;
    access_token: string;
    contact_email:  string;
    username: string;
    account_name: string;
    customer_number: string;
}

export interface UserDetailResponse {
    
}


export interface AccountDetailPayload {
    id: string | undefined;
    dispatch: Function;
    accessToken: string;
}
export interface AccountDetailResponse {
    id: string | undefined;
    first_name: string;
    last_name: string;
    fullname: string;
    contact_email: string;
    username:  string;
    account_name: string;
    customer_number: string;
}