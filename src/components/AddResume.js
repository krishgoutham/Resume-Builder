import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const AddResume = ({ onAdd, getSuggestions }) => {
  const generateID = () => {
    return Math.floor(Math.random() * 1000 + 1);
  };

  const [suggestions, ] = useState([
    { id: "SQL", text: "SQL" },
    { id: "JAVA", text: "JAVA" },
    { id: "PYTHON", text: "PYTHON" },
    { id: "REACT", text: "REACT" },
    { id: "REACT-NATIVE", text: "REACT-NATIVE" },
    { id: "HTML", text: "HTML" },
    { id: "CSS", text: "CSS" },
    { id: "FLUTTER", text: "FLUTTER" },
    { id: "JAVASCRIPT", text: "JAVASCRIPT" },
    { id: "DJANGO", text: "DJANGO" },
    { id: "LINUX", text: "LINUX" },
    { id: "AWS", text: "AWS" },
    { id: "PHP", text: "PHP" },
    { id: "GRAPHQL", text: "GRAPHQL" }
 ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [id, setID] = useState(generateID());
  const [skills, setTags] = useState([]);
  
  // const [toggle, setToggle] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || education.length < 1) {
      let msg = "";
      if (!name) {
        msg = "Please state your name";
      }
      if (!email) {
        msg = msg + "\nPlease provide your email id";
      }
      if (education.length<1) {
        msg = msg + "\nPlease add your education";
      }
      if (skills.length<1) {
        msg = msg + "\nPlease add your skills";
      }
      if (msg !== "") alert(msg);
      return;
    }

    onAdd({ name, email, address, experience, education, skills });

    setName("");
    setEmail("");
    setAddress("");
    setEducation([]);
    setExperience([]);
    setInstitute("");
    setDegree("");
    setCompany("");
    setDesignation("");
    setID("");
    setTags([])
  };

  const deleteExpID = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  const deleteEduID = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const deleteSkillID = (id) => {
    setEducation(skills.filter((skill) => skill.id !== id));
  };

  const handleDelete = (id) => {
    setTags(skills.filter((tag, index) => index !== id));
  }

  const handleAddition = (tag) => {
    skills.push(tag);
  }

  const handleDrag=(tag, currPos, newPos) =>{
    const newTags = skills.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
}

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          placeholder="Add Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>E-mail</label>
        <input
          type="text"
          placeholder="Add E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Address</label>
        <input
          type="text"
          placeholder="Add Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Experience</label>
        <div className="form-control form-control-check">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <FaPlusCircle
            style={{ color: "green", cursor: "pointer" }}
            size={30}
            onClick={() => {
              setID(() => generateID());
              let exp = { id, company, designation };
              experience.push(exp);
              setDesignation("");
              setCompany("");
            }}
          />
        </div>
        {experience.map((exp, index) => (
          <div className="form-control form-control-check" key={index}>
            <text>{exp.company}</text>
            <text>{exp.designation}</text>
            <FaTimes
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteExpID(exp.id)}
            />
          </div>
        ))}
      </div>
      <div className="form-control">
        <label>Education</label>
        <div className="form-control form-control-check">
          <input
            type="text"
            placeholder="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <input
            type="text"
            placeholder="Institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />
          <FaPlusCircle
            style={{ color: "green", cursor: "pointer" }}
            size={30}
            onClick={() => {
              setID(() => generateID());
              let edu = { id, degree, institute };
              education.push(edu);
              setDegree("");
              setInstitute("");
            }}
          />
        </div>
        {education.map((edu, index) => (
          <div className="form-control form-control-check" key={index}>
            <text>{edu.degree}</text>
            <text>{edu.institute}</text>
            <FaTimes
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteEduID(edu.id)}
            />
          </div>
        ))}
      </div>
      <div className="form-control">
      <label>Skills</label>
      <ReactTags tags={skills}
                    suggestions={suggestions}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                    placeholder="Add skills"/>
      </div>

      <input type="submit" value="Save Resume" className="btn btn-block" />
    </form>
  );
};

export default AddResume;
