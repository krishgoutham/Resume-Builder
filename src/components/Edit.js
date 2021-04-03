import { useState, useRecoilState } from 'react';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input';


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Edit = (props) => {

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
  const [resume, setResume] = useState(props.location.resume);
  const [name, setName] = useState(resume.name);
  const [email, setEmail] = useState(resume.email);
  const [address, setAddress] = useState(resume.address);
  const [education, setEducation] = useState(resume.education);
  const [experience, setExperience] = useState(resume.experience);
  const [institute, setInstitute] = useState(resume.institute);
  const [degree, setDegree] = useState(resume.degree);
  const [company, setCompany] = useState(resume.company);
  const [designation, setDesignation] = useState(resume.designation);
  const [id, ] = useState(resume.id);
  const [skills, setTags] = useState(resume.skills);

  const deleteExpID = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  const deleteEduID = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.location.onUpdate(id, { name, email, address, experience, education, skills, id });
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
    <div>
      <h3>Edit the following</h3>
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

      <input type="submit" value="Update Resume" className="btn btn-block" />
    </form>
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default Edit
