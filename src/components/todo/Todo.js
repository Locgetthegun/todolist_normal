import style from './style.module.scss';
import classNames from 'classnames/bind';
import Wrapper from '../wrapper/Wrapper';
import TodoItem from '../todo_item/TodoItem';
import {useState,useRef,useEffect} from 'react';
const cx = classNames.bind(style);
function Todo() {
    const  [list,setList] = useState([
        {
            cour:"learn",
            check:false,
            id:1,
        },
        {
            cour:"learn A",
            check:false,
            id:2,

        }
        ,{
            cour:"learn B",
            check:false,
            id:3,

        }]
    );
    const [inputText,setText] = useState("");
    const [isSearch,setIssearch] = useState(false);
    const [typeBar,setTypebar] = useState({
        add:true,
        search:false,
    })
    const [active,setActive] = useState({
        all:true,
        active:false,
        completed:false,
    })
    const htmlInput = useRef();
    const handlerCheck = (id)=>{
        const newList = list;
        newList.forEach((item)=>{
            if(item.id == id){
                item.check=!item.check;
            } 
        })
        setList([...newList]);
    }
    const handlerActive = (type)=>{
        const newActive = active;
        const newList = list;
        const keys = Object.keys(newActive);
        keys.forEach((item)=>{
            if(item == type){
                newActive[item] = true;
            }else{
                newActive[item] = false;
            }
        });
        setActive({...newActive});
    }
    const handerEnter = (e)=>{
        if(e.key=="Enter"){
            if( inputText.trim() != ""){
                setList([...list,{
                    cour:inputText,
                    check:false,
                    id:list.length+1,
                }]);
            }
            setText("");
            htmlInput.current.focus();
        }
    }
    const handerInput = (value,type)=>{
        if(type == "search"){
            
        }
        
        setText(value);
    }
    const handerChangeType = (type)=>{
        if(type == "add"){
            setTypebar({
                add:true,
                search:false,
            });
            setText("");
            setIssearch(false);
            htmlInput.current.focus();
        }else{
            setTypebar({
                add:false,
                search:true,
            });
            setText("");
            setIssearch(true);
            htmlInput.current.focus();
        }
    }
    return ( 
        <Wrapper>
            <div className={cx("title")}>
                 THINGS TO DO
            </div>
            <div className={cx("todo_main")}>


                {isSearch?
                <input  value={inputText} onChange={(e)=>{handerInput(e.target.value,"add")}} ref={htmlInput} placeholder='Search' id={cx("todo_bar")} type="text"/>
                :
                <input onKeyDown={(e)=>{handerEnter(e)}} value={inputText} onChange={(e)=>{handerInput(e.target.value,"search")}} ref={htmlInput} placeholder='Add New' id={cx("todo_bar")} type="text"/>
                }
                
                <div className={cx("todo_list")}>
                    {list.filter((item)=>{
                        if(isSearch){
                            if(item.cour.includes(inputText)){
                                if(active.all){
                                    return item;
                                }else if(active.active){
                                    if(!item.check){
                                        return item;
                                    }
                                }else if(active.completed){
                                    if(item.check){
                                        return item;
                                    }
                                }
                            }
                        }else{
                            if(active.all){
                                return item;
                            }else if(active.active){
                                if(!item.check){
                                    return item;
                                }
                            }else if(active.completed){
                                if(item.check){
                                    return item;
                                }
                            }
                        }
                    }).map((item,i)=>{
                        return <TodoItem  onCheck={handlerCheck} content={item.cour} key={i} targetID={item.id} checkBool={item.check}/> ;
                    })}
                </div>
            </div>
            <div className={cx("controls")}>
                <div className={cx("left_controls")}>
                    <div onClick={()=>{handerChangeType("add")}} className={cx("btn_main",typeBar.add && "active")}>
                        ADD
                    </div>
                    <div onClick={()=>{handerChangeType("search")}} className={cx("btn_main",typeBar.search && "active")}>
                        SEARCH
                    </div>
                    <div className={cx("list-count")}>
                         {list.length} items left
                    </div>
                </div>
                <div className={cx("right_controls")}>
                    <div onClick={()=>{handlerActive("all")}} className={cx("btn-rightControls",active.all && "btn-active")}>All</div>
                    <div onClick={()=>{handlerActive("active")}} className={cx("btn-rightControls",active.active && "btn-active")}>Active</div>
                    <div onClick={()=>{handlerActive("completed")}} className={cx("btn-rightControls",active.completed && "btn-active")}>Completed</div>
                </div>
            </div>
        </Wrapper>
     );
}

export default Todo;
