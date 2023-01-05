import React from 'react'
import Progress from '../../PlanEditor/ProgressRow/Progress/Progress'
import styles from './ProductRow.module.scss'

const ProductRow = ({product, number, disabledInput, setValue}) => {
  return (
    <div className={styles.root}>
    
    <div>{number}</div>
    <div>{product.name}</div>
    <Progress max={product.quantityAll} value={product.quantityMade}/>
    

    {/* <div>{product.quantityRequired}</div> */}

    {/* <div>{product.quantityMadeToday}</div> */}
    {disabledInput 
       ? <Progress max={product.quantityRequired} value={product.quantityMadeToday} />
       :<input  type="number" onChange={(e)=>setValue(e.target.value)} className={styles.input} value={product.quantityMadeToday}/>

    }
         
         
    </div>
  )
}

export default ProductRow