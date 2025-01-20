
export function saveAuthToken(token) {
    localStorage.setItem("token", token);
}

export function getAuthToken() {
    const authToken = localStorage.getItem("token");
    return authToken;
}

export function tokenLoader() {
    return getAuthToken();
}