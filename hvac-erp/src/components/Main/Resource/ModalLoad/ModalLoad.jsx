import React from 'react'
import styles from './ModalLoad.module.scss'
import {setCheckBoxUpkp,
    setCheckBoxOther,
   } from './../../../../redux/slices/filtrSlice'
import { useDispatch, useSelector } from 'react-redux';

const ModalLoad = ({active, setActive}) => {

const {checkBoxUpkp, checkBoxOther} = useSelector((state)=>state.filtr);
const dispatch = useDispatch();


const onChangeCheckBoxUpkp = (e)=>{
    dispatch(setCheckBoxUpkp(e));
}

  return (
    <div className={styles.modal} onClick={()=>setActive(false)}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
            <input type="checkbox"
                   onChange={(e)=>onChangeCheckBoxUpkp(e.target.checked)}
                   checked={checkBoxUpkp} />
            </div>
    </div>
  )
}

export default ModalLoad