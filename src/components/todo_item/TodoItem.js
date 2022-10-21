import classNames from "classnames/bind";
import style from './style.module.scss';

const cx = classNames.bind(style);
function TodoItem({content,targetID,checkBool,onCheck}) {
    return ( 
        <div className={cx("todo_item")} >
            <label  className={cx("content",checkBool && "checkedStyle")} htmlFor={targetID}> 
                <input  onChange={()=>{onCheck(targetID)}} checked={checkBool && "checked"} className={cx("check")} id={targetID} type="checkbox"/>
                <span>
                    {content}
                </span>
            </label>
        </div>
     );
}

export default TodoItem;