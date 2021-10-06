import Button from "./Button";
import { useLocation } from "react-router";

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation();

    return (
        <header className='header'>
            <h1>{title}</h1>
            { location.pathname === '/' && <Button onClick={onAdd} color={ showAdd ? 'red' : 'green' } text={ showAdd ? 'Close' : 'Add' }/> }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header
