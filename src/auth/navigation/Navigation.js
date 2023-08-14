import './Navigation.css';
import { Link } from 'react-router-dom';
import FieldSearch from '../search/FieldSearch';

const Navigation = () => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-content">
                    <Link to="/">로고(메인페이지로 이동)</Link>
                </div>
                <div className='search'>
                    <FieldSearch />
                </div>
            </div>
        </>
    )
}

export default Navigation;