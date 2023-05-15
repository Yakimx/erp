import React from 'react'
import styles from './ModalFiltr.module.scss'
import {setCheckBoxUpkp,
    setCheckBoxOther,
    setCheckBoxPause,
    setCheckBoxReady,
    setCheckBoxPending,
    setCheckBoxShipped,
   } from './../../../redux/slices/filtrSlice'
import { useDispatch, useSelector } from 'react-redux';
import closePNG from '../../../assets/img/close.png'


const ModalFiltr = ({active, setActive}) => {

const {checkBox} = useSelector((state)=>state.filtr.filtrState);
const dispatch = useDispatch();

const onChangeCheckBoxUpkp = (e)=>{
    dispatch(setCheckBoxUpkp(e));
}
const onChangeCheckBoxOther = (e)=>{
    dispatch(setCheckBoxOther(e));
}
const onChangeCheckBoxPause = (e)=>{
    dispatch(setCheckBoxPause(e));
}
const onChangeCheckBoxReady = (e)=>{
    dispatch(setCheckBoxReady(e));
}
const onChangeCheckBoxPending = (e)=>{
    dispatch(setCheckBoxPending(e));
}
const onChangeCheckBoxShipped = (e)=>{
    dispatch(setCheckBoxShipped(e));
}

  return (
    <div className={styles.modal} onClick={()=>setActive(false)}>
        <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
            <div className={styles.header}>
            Фильтр      
            <img className={styles.closeIcon} onClick={()=>setActive()}  src={closePNG}/>    
            </div>

            <div className={styles.listCheckbox}>                
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxUpkp(e.target.checked)}
                   checked={checkBox.upkp} /> УПКП</div>
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxOther(e.target.checked)}
                   checked={checkBox.other} /> Общепром</div> 
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxPause(e.target.checked)}
                   checked={checkBox.pause} /> Приостановлен</div> 
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxReady(e.target.checked)}
                   checked={checkBox.ready} /> Готов</div>
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxPending(e.target.checked)}
                   checked={checkBox.pending} /> В производстве </div> 
            <div><input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxShipped(e.target.checked)}
                   checked={checkBox.shipped} /> Отгружен </div>                 
            </div>
            
            
        </div>
    </div>
  )
}

export default ModalFiltr