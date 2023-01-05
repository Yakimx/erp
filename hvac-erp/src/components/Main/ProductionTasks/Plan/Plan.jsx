import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../elementsUI/Button/Button';
import { setDisabledInput, saveValue, updateValue, setPlan } from '../../../../redux/slices/planSlice';
import ProductRow from '../ProductRow/ProductRow';
import styles from './Plan.module.scss'

const Plan = ({plan, setValueInput}) => {

    const dispatch = useDispatch();
    const {disabledInput} = useSelector((state)=>state.plan);
    const {} = useSelector((state)=>state.resources);
    const {allContracts} = useSelector((state)=>state.contracts);

    const onClickEditButton = (bool)=>{           
      dispatch(setDisabledInput(bool));
    }

    const onClickSaveButton = ()=>{
      dispatch(saveValue());
      dispatch(setDisabledInput(true));
      dispatch(updateValue()); 
    }
    const onClickCancelButton = ()=>{
      dispatch(updateValue()); 
      dispatch(setDisabledInput(true));
    }

    const onClickUpdateButton = ()=>{
      dispatch(setPlan(allContracts)); 
    }

    const onChangeInput = (obj)=>{
      dispatch(setValueInput(obj))
    }
    
    
  return (
    <div className={styles.root}>
      
<div className={styles.buttonBar}>
{ !disabledInput ? (
          <div className={styles.buttonBar}>         
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton()} label={'Сохранить'}/>
          <Button click={()=>onClickUpdateButton()} label={'Обновить план'}/>         
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
  plan.map((day, indexDay)=>(
  <div key={indexDay}>
    
  <div className={styles.date}>
    {day.date}
  </div>
  <div className={styles.contracts}>
    {day.listPlan.map((contract, indexContract)=>(
      <div key={indexContract}>

      
        {contract.products.map((product,indexProduct)=>(
          <div key={indexProduct}>
             <div className={styles.productRow}>
              <ProductRow 
              number={product.contractNumber} 
              product={product} 
              disabledInput={disabledInput} 
              setValue={(value)=>onChangeInput({value, indexProduct, indexContract, indexDay})}/>
              
              </div>
          </div>
        ))}

       
      </div>
    ))}
  </div>
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
