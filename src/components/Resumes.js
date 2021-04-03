import Resume from './Resume'

const Resumes = ({ resumes, onDelete, onUpdate }) => {
  return (
    <>
      {resumes.map((resume, index) => (
        <Resume key={index} resume={resume} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </>
  )
}

export default Resumes
