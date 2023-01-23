import React from 'react'
import Input from './Input/Input'
import styles from './InputRow.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDocValue, 
  setCutValue, 
  setSheetValue, 
  setAssemAValue,
  setAssemBValue,
  setAssemCValue,
  setAssemSauValue,
  setAutoValue} from './../../../../redux/slices/contractsSlice'

const InputRow = ({disabledInput, product, index, maxValue}) => {

const dispatch = useDispatch();
const {contract} = useSelector((state)=>state.contracts.activeContract);

const onChangeDocInput = (value)=>{  
  dispatch(setDocValue({value, index, maxValue}))
}
const onChangeCutInput = (value)=>{
  dispatch(setCutValue({value, index, maxValue}))
}
const onChangeSheetInput = (value)=>{
  dispatch(setSheetValue({value, index, maxValue}))
}
const onChangeAssemAInput = (value)=>{
  dispatch(setAssemAValue({value, index, maxValue}))
}
const onChangeAssemBInput = (value)=>{
  dispatch(setAssemBValue({value, index, maxValue}))
}
const onChangeAssemCInput = (value)=>{
  dispatch(setAssemCValue({value, index, maxValue}))
}
const onChangeAssemSauInput = (value)=>{
  dispatch(setAssemSauValue({value, index, maxValue}))
}

const onChangeAutoInput = (value)=>{
  dispatch(setAutoValue({value, index, maxValue}))
}


  return (
    <div className={styles.inputRow}>
      <div>{product.name}</div>
      <div>{product.quantity}</div>

      <Input setValue={(e)=>onChangeDocInput(e)} disabled={disabledInput} inputValue={product.quantityMade.documentation} index={index}/>
      <Input setValue={(e)=>onChangeAutoInput(e)}disabled={disabledInput} inputValue={product.quantityMade.automation} index={index}/> 
      <Input setValue={(e)=>onChangeCutInput(e)}disabled={disabledInput} inputValue={product.quantityMade.cutting} index={index}/>      
      <Input setValue={(e)=>onChangeSheetInput(e)}disabled={disabledInput} inputValue={product.quantityMade.sheetBender} index={index}/>      
      <Input setValue={(e)=>onChangeAssemAInput(e)}disabled={disabledInput} inputValue={product.quantityMade.assemblingA} index={index}/>
      <Input setValue={(e)=>onChangeAssemBInput(e)}disabled={disabledInput} inputValue={product.quantityMade.assemblingB} index={index}/>
      <Input setValue={(e)=>onChangeAssemCInput(e)}disabled={disabledInput} inputValue={product.quantityMade.assemblingC} index={index}/>
      <Input setValue={(e)=>onChangeAssemSauInput(e)}disabled={disabledInput} inputValue={product.quantityMade.assemblingSau} index={index}/>      
      
      </div>
  )
}

export default InputRow