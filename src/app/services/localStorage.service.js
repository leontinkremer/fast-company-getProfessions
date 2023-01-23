const EXPIRES_KEY = "jwt-expiresDate";
const TOKEN_KEY = "jwt-idToken";
const REFRESH_KEY = "jwt-refreshToken";
const USERID_KEY = "user-local-id";

export function setToken({ expiresIn, idToken, localId, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
}

export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setToken,
    getAccessToken,
    removeAuthData,
    getRefreshToken,
    getExpiresDate,
    getUserId
};

export default localStorageService;
