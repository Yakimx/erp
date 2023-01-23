import React from 'react'
import Input from './Input/Input'
import styles from './InputRowLab.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDocValueLab, 
  setCutValueLab, 
  setSheetValueLab, 
  setAssemAValueLab,
  setAssemBValueLab,
  setAssemCValueLab,
  setAssemSauValueLab,
  setAutoValueLab} from './../../../../../redux/slices/contractsSlice'

const InputRowLab = ({disabledInput, product, index}) => {

const dispatch = useDispatch();
const {contract} = useSelector((state)=>state.contracts.activeContract);

const onChangeDocInput = (value)=>{  
  dispatch(setDocValueLab({value, index}))
}
const onChangeCutInput = (value)=>{
  dispatch(setCutValueLab({value, index}))
}
const onChangeSheetInput = (value)=>{
  dispatch(setSheetValueLab({value, index}))
}
const onChangeAssemAInput = (value)=>{
  dispatch(setAssemAValueLab({value, index}))
}
const onChangeAssemBInput = (value)=>{
  dispatch(setAssemBValueLab({value, index}))
}
const onChangeAssemCInput = (value)=>{
  dispatch(setAssemCValueLab({value, index}))
}
const onChangeAssemSauInput = (value)=>{
  dispatch(setAssemSauValueLab({value, index}))
}

const onChangeAutoInput = (value)=>{
  dispatch(setAutoValueLab({value, index}))
}


  return (
    <div className={styles.inputRow}>
      <div>{product.name}</div>
      

      <Input setValue={(e)=>onChangeDocInput(e)} disabled={disabledInput} inputValue={product.resourcesRequired.documentation} index={index}/>
      <Input setValue={(e)=>onChangeAutoInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.automation} index={index}/> 
      <Input setValue={(e)=>onChangeCutInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.cutting} index={index}/>      
      <Input setValue={(e)=>onChangeSheetInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.sheetBender} index={index}/>      
      <Input setValue={(e)=>onChangeAssemAInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.assemblingA} index={index}/>
      <Input setValue={(e)=>onChangeAssemBInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.assemblingB} index={index}/>
      <Input setValue={(e)=>onChangeAssemCInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.assemblingC} index={index}/>
      <Input setValue={(e)=>onChangeAssemSauInput(e)}disabled={disabledInput} inputValue={product.resourcesRequired.assemblingSau} index={index}/>      
      
      </div>
  )
}

export default InputRowLab