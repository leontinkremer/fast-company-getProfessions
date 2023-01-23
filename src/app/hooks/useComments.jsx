import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import createUniqueID from "../utils/createUniqueID";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const UseComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: createUniqueID(),
            pageId: userId,
            userId: currentUser._id,
            created_at: Date.now()
        };

        try {
            const { content } = await commentService.createComment(comment);

            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }

        console.log({ comment });
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments((prevState) => prevState.fill((c) => c._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, removeComment, isLoading }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
