import { ActionContext } from 'vuex';

export type Context = ActionContext<any, any>;

export interface AuthState {
    token: string | null;
    isLoggedIn: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface UIState {
    isLoading: boolean;
}

export interface HttpState {
    apiUrl: string;
    loginUrl: string;
}

export interface HttpOptions {
    method: string;
    endpoint?: string;
    queryParams?: string;
    data?: object;
    token?: string;
    login?: boolean;
    successAction: string;
    successMessage?: string;
    errorMessage: string;
}

export interface SnackbarState {
    shown: boolean;
    hasError: boolean;
    message: string;
    timeout: number;
}
