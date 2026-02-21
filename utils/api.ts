// utils/api.ts
const BASE_URL = 'https://ctsyftybpwjrscsq.tunnel.elice.io/api';

export interface GroupItem {
    id: number;
    team_id: number;
    name: string;
    leader_id: number;
    created_at: string;
}

export interface TeamMember {
    id: number;
    team_id: number;
    user_id: number;
    user_name: string;
    user_student_id: string;
    user_hakbun: number;
    role: string;
}

export interface MyTeamResponse {
    id: number;
    name: string;
    admin_id: number;
    auth_code: string;
    created_at: string;
    my_role: string;
    members?: TeamMember[]; // Adding members array logically to match context if available in response
}

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
        ...(options.headers as Record<string, string>),
    };

    // If body is FormData, don't set Content-Type to application/json
    // The browser/fetch will automatically set it to multipart/form-data with the correct boundary
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

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
