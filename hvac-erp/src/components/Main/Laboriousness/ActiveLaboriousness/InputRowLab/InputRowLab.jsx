import React from 'react'
import Input from './Input/Input'
import styles from './InputRowLab.module.scss'
import addPNG from './../../../../../assets/img/add.png'
import { useDispatch, useSelector } from 'react-redux';
import {setValueLab} from './../../../../../redux/slices/contractsSlice'
import {copyLaboriousness, fetchLaboriousness} from './../../../../../redux/slices/laboriousnessSlice'

const InputRowLab = ({disabledInput, product, index}) => {

const dispatch = useDispatch();
const {contract} = useSelector((state)=>state.contracts.activeContract);
const {areas} = useSelector((state)=>state.contracts);

const onChangeInput = (value, key)=>{  
  dispatch(setValueLab({value, index, key}))
}
const onClickAddButton = (product)=>{  
  dispatch(copyLaboriousness({name: product.name, code: product.code, areas: product.resourcesRequired})); 
  dispatch(fetchLaboriousness()); 
}



  return (
    <div className={styles.inputRow}>
      <div>{product.code}</div>
      <div>{product.name}</div>
      
      {
        areas.map((key, i)=>{
          return <Input key={key} setValue={(e)=>onChangeInput(e,key)} disabled={disabledInput} inputValue={product.resourcesRequired[key]} index={index}/>
        })
      }

    {!disabledInput && <img onClick={()=>onClickAddButton(product)} src={addPNG}/>}
      
      </div>
  )
}

export default InputRowLab