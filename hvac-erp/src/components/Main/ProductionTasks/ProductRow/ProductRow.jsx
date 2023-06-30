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
    
    <div>{product.window ? "" : number}</div>
    <div>{product.name}</div>
    {(!product.window) 
    ? <Progress max={product.quantityAll} value={product.quantityMade}/>
    : <div></div>
    }
     
    
    {(disabledInput && !product.window) 
       ? <Progress max={product.planQuantityRequired} value={product.quantityMadeToday} />
       :!product.window ? 
       (
       <input  type="number" onChange={(e)=>setValue(e.target.value)} className={styles.input} value={inputValue}/>
       )
       :<div></div>
    }
    
    <div>{product.prevSector == 0 ? 'нет' : product.prevSector }</div>
    <div  className = {styles.planDate}>      
    
         
    {
      product.planItem.map((item, index)=>{
        
        return (         
        <div key = {index} className = {highlight==item.startDate ? styles.highlight : styles.nohighlight}> 
       
        <div className = {styles.date}>{item.newDay == true ? new Date(item.startDate).toLocaleDateString() : ""}</div>        
        <div >{new Date(item.startDate).toLocaleTimeString()}--{new Date(item.endDate).toLocaleTimeString()}</div>       
        
        </div>
        )

      })
    
    }    
    </div>
    
    
    <div className={styles.arrow}>
    {(true) 
    ? <div>{`${product.completionDateDesired} ${new Date(Date.parse(product.completionDateDesired.split(".").reverse().join(".")) + product.shift*1000*60*60*24)
    .toLocaleDateString()} `} </div>
    : <div></div>
    }
    

    {(!disabledInput && active && !product.window) && (
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