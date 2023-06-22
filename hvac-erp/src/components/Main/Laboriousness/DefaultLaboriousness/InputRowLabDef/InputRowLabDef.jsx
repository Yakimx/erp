import React from 'react'
import Input from './Input/Input'
import styles from './InputRowLabDef.module.scss'
import deletePNG from './../../../../../assets/img/delete.png'
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLaboriousness, 
  fetchLaboriousness,
  setValue, 
  setName,
  setCode,
} from '../../../../../redux/slices/laboriousnessSlice'

const InputRowLab = ({disabledInput, laboriousnes, index}) => {

const dispatch = useDispatch();
const {areas} = useSelector((state)=>state.contracts);

const onClickDelButton = async (id)=>{ 
 await dispatch(deleteLaboriousness(id));
  dispatch(fetchLaboriousness());
}
const onChangeInput = (value, key)=>{  
  dispatch(setValue({value, index, key}))
}

const onChangeName = (value)=>{
  dispatch(setName({value, index}))
}
const onChangeCode = (value)=>{
  dispatch(setCode({value, index}))
}



  return (
    <div className={styles.inputRow}>
      
      <TextareaAutosize onChange={(e)=>onChangeCode(e.target.value)} className = {styles.input} value={laboriousnes.code} disabled={disabledInput}></TextareaAutosize>
      <TextareaAutosize onChange={(e)=>onChangeName(e.target.value)} className = {styles.input} value={laboriousnes.name} disabled={disabledInput}></TextareaAutosize>
      
      
      {
        areas.map((key, i)=>{
          return <Input key={i} setValue={(e)=>onChangeInput(e,key)} disabled={disabledInput} inputValue={laboriousnes.areas[key]} index={index}/>
        })
      }

      {!disabledInput && <img onClick={()=>onClickDelButton(laboriousnes._id)} src={deletePNG}/>}


      </div>
  )
}

export default InputRowLab