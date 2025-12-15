export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data: T;
    errors?: ApiErrorDetail[];
}

export interface ApiErrorDetail {
    field?: string;
    message: string;
}
