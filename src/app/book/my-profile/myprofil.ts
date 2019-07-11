export interface user{
    user_email: string;
    user_login: string;
    user_status_id: string;
    user_name: string;
}

export interface password{
    old_psw: string;
    new_psw: string;
    repeat_psw: string
}