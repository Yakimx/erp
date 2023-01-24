import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../elementsUI/Button/Button';
import { setValueNotConfirmed, setDisabledInput, saveValue, updateValue, setPlan } from '../../../../redux/slices/planSlice';
import {  fetchContracts, updateNotConfirmed, updatePlan,setNotConfirmed } from '../../../../redux/slices/contractsSlice';
import { setStartDate,
  setCheckBoxStartDate,submitResource } from '../../../../redux/slices/resourcesSlice';


import ProductRow from '../ProductRow/ProductRow';
import styles from './Plan.module.scss'

const Plan = ({plan, type}) => {

    const dispatch = useDispatch();
   // const {disabledInput} = useSelector((state)=>state.plan);
    const planState = useSelector((state)=>state.plan);
    const {disabledInput} = planState;
    const {objResources} = useSelector((state)=>state.resources);
    const {allContracts} = useSelector((state)=>state.contracts);
    const {startPlanDate, checkBoxStartDate } = objResources.config;

    const onClickEditButton = (bool)=>{           
      dispatch(setDisabledInput(bool));
    }

    const onClickSaveButton = (bool)=>{
      dispatch(setNotConfirmed(planState));       
      dispatch(updateNotConfirmed(allContracts));      
      //dispatch(fetchContracts()); 
      dispatch(setDisabledInput(bool));
    }
    const onClickCancelButton = ()=>{
      dispatch(setPlan({allContracts,objResources}));
      //dispatch(fetchContracts()); 
      //dispatch(setPlan({allContracts,objResources}));  
      dispatch(setDisabledInput(true));
    }

    const onClickUpdateButton = (startPlanDate)=>{  
      dispatch(submitResource(objResources));      
      dispatch(updatePlan());
    }

    const onChangeInput = (obj)=>{
      dispatch(setValueNotConfirmed(obj))
    }
  
  const onChangeLastDate = (e)=>{
      dispatch(setStartDate(e));
  }
  const onChangeCheckBoxDate = (e)=>{   
    const today = new Date().toLocaleDateString().split('.').reverse().join('-');     
     dispatch(setCheckBoxStartDate({e, today}));
  }
    

React.useEffect(()=>{
  dispatch(setPlan({allContracts,objResources})); 
},[allContracts])    
    
  return (
    <div className={styles.root}>
      
<div className={styles.buttonBar}>
{ !disabledInput ? (
          <div className={styles.buttonBar}>         
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton(true)} label={'Сохранить'}/>
          <div className={styles.updatePlan}>
                  
          
      Дата начала нового плана:
     <input type="date" min={new Date().toLocaleDateString().split('.').reverse().join('-')} 
            onChange={(e)=>onChangeLastDate(e.target.value)} 
            disabled={disabledInput || checkBoxStartDate} 
            value= {startPlanDate}/> 
           
                   <div className={styles.checkbox}>
                   <input type="checkbox"
                          onChange={(e)=>onChangeCheckBoxDate(e.target.checked)}
                          checked={checkBoxStartDate} />
                    Сегодня
                   </div>
                   <Button click={()=>onClickUpdateButton(startPlanDate)} label={'Обновить план'}/> 
                 
    
          </div>
         
          </div>
    ) :(  
          <div className={styles.buttonBar}>          
          <Button click={()=>onClickEditButton(false)} label={'Редактировать'}/>         
          </div>)
    }
</div>





      <div className={styles.head}> 
      <div>№ договора</div>  
      <div>Наименование</div>
      <div>Выполнено всего</div>
      
      <div>Текущее задание</div>
      </div>

<div className={styles.list}>

      {plan.length!=0 ? (
  plan.map((dayPlan, indexDay)=>(
  <div key={indexDay}>
    
  <div className={styles.date}>
    {dayPlan.date}
  </div>   
      
        {dayPlan.list.map((product, index)=>{
          let contractNumber = product.contractNumber;
          let indexProduct = index;
          return(
          <div key={index}>
             <div className={styles.productRow}>
              <ProductRow 
              number={contractNumber} 
              product={product} 
              disabledInput={disabledInput} 
              setValue={(value, maxValue)=>onChangeInput({value, indexDay ,contractNumber, indexProduct, type, maxValue })}/>
              
              </div>
          </div>
        )})}


  
  </div>
  )
  )
  ):'План пуст'

      }
        
        </div>
    </div>
  )
}

export default Plan
