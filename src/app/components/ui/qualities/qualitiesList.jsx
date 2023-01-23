import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    const isLoading = useSelector(getQualitiesLoadingStatus());
    console.log("qualitiesList", qualitiesList);

    useEffect(() => {
        // load actual data from api when mount component.
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading...";

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality
                    key={qual._id}
                    color={qual.color}
                    _id={qual._id}
                    name={qual.name}
                />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
