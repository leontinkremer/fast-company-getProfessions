import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested(state) {
            state.isLoading = true;
        },
        professionsReceived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 90 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        // console.log("lastFetch", lastFetch);
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.fetchAll();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

// Selectors
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities) {
        const objProfessions = {};
        state.professions.entities.forEach((profession) => {
            if (profession._id === professionsIds) {
                Object.assign(objProfessions, {
                    _id: profession._id,
                    name: profession.name
                });
            }
        });

        return objProfessions;
    }
    return [];
};
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getError = () => (state) => state.professions.error;

export default professionsReducer;
