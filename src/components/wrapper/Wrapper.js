import style from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Wrapper({children}) {
    return ( 
        <div className={cx("wrapper")}>
            {children}
        </div>
     );
}

export default Wrapper;