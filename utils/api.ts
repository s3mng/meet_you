// utils/api.ts
const BASE_URL = 'https://ctsyftybpwjrscsq.tunnel.elice.io/api';

let accessToken: string | null = null;

export const setToken = (token: string) => {
    accessToken = token;
};

export const getToken = () => accessToken;

export const clearToken = () => {
    accessToken = null;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { detail: `알 수 없는 오류가 발생했습니다. (Status: ${response.status})` };
        }
        throw new Error(JSON.stringify(errorData));
    }

    // For 204 No Content
    if (response.status === 204) {
        return null;
    }

    return response.json();
};
