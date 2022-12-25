import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { setToken } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });

            setToken(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с такой почтой уже существует."
                    };
                    console.log(errorObject.email);
                    throw errorObject;
                }
            }
            throw new Error();
        }
    }

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });

            setToken(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь не найден."
                    };
                    console.log(errorObject.email);
                    throw errorObject;
                }

                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        email: "Не верный пароль."
                    };
                    console.log(errorObject.email);
                    throw errorObject;
                }

                if (message === "USER_DISABLED") {
                    const errorObject = {
                        email: "Ваша учетная запись не активна."
                    };
                    console.log(errorObject.email);
                    throw errorObject;
                }
            }
            throw new Error();
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
