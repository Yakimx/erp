import React from 'react'
import Input from './Input/Input'
import styles from './InputRowLabDef.module.scss'
import deletePNG from './../../../../../assets/img/delete.png'
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLaboriousness, 
  fetchLaboriousness,
  setDocValue, 
  setName,
  setCutValue, 
  setSheetValue, 
  setAssemAValue,
  setAssemBValue,
  setAssemCValue,
  setAssemSauValue,
  setAutoValue} from '../../../../../redux/slices/laboriousnessSlice'

const InputRowLab = ({disabledInput, laboriousnes, index}) => {

const dispatch = useDispatch();
//const {laboriousness} = useSelector((state)=>state.laboriousness);

const onClickDelButton = async (id)=>{ 
 await dispatch(deleteLaboriousness(id));
  dispatch(fetchLaboriousness());
}
const onChangeDocInput = (value)=>{  
  dispatch(setDocValue({value, index}))
}
const onChangeCutInput = (value)=>{
  dispatch(setCutValue({value, index}))
}
const onChangeSheetInput = (value)=>{
  dispatch(setSheetValue({value, index}))
}
const onChangeAssemAInput = (value)=>{
  dispatch(setAssemAValue({value, index}))
}
const onChangeAssemBInput = (value)=>{
  dispatch(setAssemBValue({value, index}))
}
const onChangeAssemCInput = (value)=>{
  dispatch(setAssemCValue({value, index}))
}
const onChangeAssemSauInput = (value)=>{
  dispatch(setAssemSauValue({value, index}))
}

const onChangeAutoInput = (value)=>{
  dispatch(setAutoValue({value, index}))
}
const onChangeName = (value)=>{
  dispatch(setName({value, index}))
}



  return (
    <div className={styles.inputRow}>
      {/* <div>{laboriousnes.name}</div> */}
      
      <TextareaAutosize onChange={(e)=>onChangeName(e.target.value)} className = {styles.input} value={laboriousnes.name} disabled={disabledInput}></TextareaAutosize>
      

      <Input setValue={(e)=>onChangeDocInput(e)} disabled={disabledInput} inputValue={laboriousnes.documentation} index={index}/>
      <Input setValue={(e)=>onChangeAutoInput(e)}disabled={disabledInput} inputValue={laboriousnes.automation} index={index}/> 
      <Input setValue={(e)=>onChangeCutInput(e)}disabled={disabledInput} inputValue={laboriousnes.cutting} index={index}/>      
      <Input setValue={(e)=>onChangeSheetInput(e)}disabled={disabledInput} inputValue={laboriousnes.sheetBender} index={index}/>      
      <Input setValue={(e)=>onChangeAssemAInput(e)}disabled={disabledInput} inputValue={laboriousnes.assemblingA} index={index}/>
      <Input setValue={(e)=>onChangeAssemBInput(e)}disabled={disabledInput} inputValue={laboriousnes.assemblingB} index={index}/>
      <Input setValue={(e)=>onChangeAssemCInput(e)}disabled={disabledInput} inputValue={laboriousnes.assemblingC} index={index}/>
      <Input setValue={(e)=>onChangeAssemSauInput(e)}disabled={disabledInput} inputValue={laboriousnes.assemblingSau} index={index}/>      

      {!disabledInput && <img onClick={()=>onClickDelButton(laboriousnes._id)} src={deletePNG}/>}


      </div>
  )
}

export default InputRowLab