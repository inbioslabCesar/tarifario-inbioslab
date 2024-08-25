import style from './UserRole.module.css'

const ROLE_STYLE = {
  teacher: ["Profesor", style.teacher],
  student: ["Alumno", style.student],
  other: ["otro", style.other],
};
const UserRole = ({ role }) => {
    

    const [roleName, roleClassname] = ROLE_STYLE[role] || ROLE_STYLE.other;
    
  return <span className={`${style.role} ${roleClassname}`}>{roleName}</span>;
};
export default UserRole;
