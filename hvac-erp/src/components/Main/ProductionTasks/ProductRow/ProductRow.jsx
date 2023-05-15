import React from 'react'
import Progress from '../../PlanEditor/ProgressRow/Progress/Progress'
import styles from './ProductRow.module.scss'
import arrowPNG from './../../../../assets/img/up-arrow.png'
import {
  setCorrectDayUp,
  setCorrectDayDown,
} from "../../../../redux/slices/contractsSlice";
import { useDispatch } from 'react-redux';


const ProductRow = ({product, number, disabledInput, setValue, inputValue,indexContract, indexItem, type, active, highlight }) => {

const dispatch = useDispatch();



  const onClickUp = () => { 
    dispatch(setCorrectDayUp({indexContract, indexItem, type}))
  }
  const onClickDowm = () => { 
    dispatch(setCorrectDayDown({indexContract, indexItem, type}))
  }
   
  return (
    <div className={styles.root}>
    
    <div>{number}</div>
    <div className=''>{product.name}</div>
    <Progress max={product.quantityAll} value={product.quantityMade}/>
    
    {disabledInput 
       ? <Progress max={product.planQuantityRequired} value={product.quantityMadeToday} />
       :(
       <input  type="number" onChange={(e)=>setValue(e.target.value)} className={styles.input} value={inputValue}/>
       )
    }
    
    <div  className = {styles.planDate}>      
    
         
    {
      product.planItem.map((item, index)=>{
        
        return (
          <div key = {index} className = {highlight==item.startDate ? styles.highlight : styles.nohighlight}> 
        {/* //Date.parse(product.planItem[0].startDate.split(".").reverse().join(".")) - Date.parse(product.planItem[0].endDate.split(".").reverse().join(".")) */}
        <div >{item.startDate}</div>
        <div >{item.endDate}</div> 
        <div >{Math.round(item.partDay*100*100)/100}% /{Math.round(item.remPerc*100*100)/100}%</div>
        </div>
        )

      })
    
    }    
    </div>
    
    
    <div className={styles.arrow}>
    <div>{new Date(Date.parse(product.completionDateDesired.split(".").reverse().join(".")) + product.shift*1000*60*60*24)
    .toLocaleDateString() }</div>

    {(!disabledInput && active) && (
    <div>
    <img className={styles.arrowUp} onClick={()=>onClickUp()} src={arrowPNG}/>
    <img className={styles.arrowDown} onClick={()=>onClickDowm()} src={arrowPNG}/>
    </div>
    )
    }
    </div>
    

         
    </div>
  )
}

export default ProductRow