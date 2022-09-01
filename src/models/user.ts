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

  
// export interface MyLibraryEntity {
//     _id: string;
//     user: UserEntity | string;
//     songs: Array<MusicEntity> | string;
//   }