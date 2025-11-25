const API_BASE_URL = 'http://localhost:8080';

async function checkAuth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Auth check failed:', {
                status: response.status,
                statusText: response.statusText,
                data
            });
            return { isAuthenticated: false, user: null, error: data.error || 'Authentication failed' };
        }

        return {
            isAuthenticated: data.authenticated || false,
            user: data
        };
    } catch (error) {
        console.error('Authentication check failed:', error);
        return {
            isAuthenticated: false,
            user: null,
            error: error.message
        };
    }
}

export async function isAuthenticated() {
    return await checkAuth();
}

export function login() {
    // Clear any existing auth state
    localStorage.removeItem('oauthState');

    // Add a random state parameter to prevent CSRF
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('oauthState', state);

    // Redirect to the OAuth2 authorization endpoint
    const authUrl = new URL('http://localhost:8080/oauth2/authorization/google');
    authUrl.searchParams.append('state', state);
    window.location.href = authUrl.toString();
}

export async function logout() {
    try {
        await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        // Clear local storage and redirect
        localStorage.removeItem('oauthState');
        window.location.href = 'http://localhost:3000';
    }
}