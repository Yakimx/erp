import React from 'react'
import { useSelector } from 'react-redux'
import Input from '../InputRow/Input/Input'
import DeliveryDate from './DeliveryDate/DeliveryDate'
import Progress from './Progress/Progress'
import styles from './ProgressRow.module.scss'

const ProgressRow = ({disabledInput, product}) => {

  const {areas, delivery} = useSelector((state)=>state.contracts);
  let list = [...areas, ...delivery];

  return (
    <div className={styles.progressRow}>
      <div>{product.name}</div>
      <div>{product.quantity}</div>

      {
        list.map((key, i)=>{
          key = (key == 'delivery') ? 'op' : (key == 'deliverySAU') ? 'sau' : key;
          return (key != 'op' && key != 'sau') 
          ? <Progress key={i} max={product.quantity} value={product.quantityMade[key]} required={product.resourcesRequired[key]}/>
          : <DeliveryDate key={i} date = {product.delivery[key]} />;
        })
      }

           


      </div>
  )
}

export default ProgressRow

