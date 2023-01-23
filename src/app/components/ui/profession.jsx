import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProfessionsByIds } from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionsByIds(id));
    return <p>{prof.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
