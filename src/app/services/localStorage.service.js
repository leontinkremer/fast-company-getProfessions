const EXPIRES_KEY = "jwt-expiresDate";
const TOKEN_KEY = "jwt-idToken";
const REFRESH_KEY = "jwt-refreshToken";

export function setToken({ expiresIn, idToken, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
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

export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getExpiresDate
};

export default localStorageService;
