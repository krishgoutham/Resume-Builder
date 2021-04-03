import { createElement } from "react";
import { FaAlignRight, FaTimes } from "react-icons/fa";
import { Link, Route } from "react-router-dom";

const Resume = ({ resume, onDelete, onUpdate }) => {
  return (
    <div
      className={`task reminder`}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to={{ pathname: "/edit", resume, onUpdate }}>
        {/* <div className={`task reminder`}> */}
        <h3>{resume.name} </h3>
        <p>{resume.email}</p>
        {/* </div> */}
      </Link>
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(resume.id)}
      />
    </div>
  );
};

export default Resume;
