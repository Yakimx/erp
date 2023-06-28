import React from 'react'
import Input from './Input/Input'
import styles from './InputRow.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setValueQuantityMade, setDeliveryDate} from './../../../../redux/slices/contractsSlice'
import InputDate from './InputDate/InputDate';

const InputRow = ({disabledInput, product, index, maxValue}) => {

const dispatch = useDispatch();
const {contract} = useSelector((state)=>state.contracts.activeContract);
const {areas} = useSelector((state)=>state.contracts);

const onChangeValue = (value, target)=>{  
  dispatch(setValueQuantityMade({value, index, maxValue, target}))
}
const onChangeDeliveryDate = (value, target)=>{  
  dispatch(setDeliveryDate({value, index, target}))
}

  return (
    <div className={styles.inputRow}>
      <div>{product.name}</div>
      <div>{product.quantity}</div>
      {
        areas.map((key, i)=>{
          key = (key == 'delivery') ? 'op' : (key == 'deliverySAU') ? 'sau' : key;
          return (key != 'op' && key != 'sau')
         ? (<Input key={i} setValue={(e)=>onChangeValue(e,key)} disabled={disabledInput} inputValue={product.quantityMade[key]} index={index}/>)
         : (<InputDate key={i} setValue={(e)=>onChangeDeliveryDate(e,key)} disabled={disabledInput} inputValue={product.delivery[key]} index={index}/>)
        })
      }

          
      </div>
  )
}

export default InputRow