import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../elementsUI/Button/Button';

import styles from './ActiveLaboriousness.module.scss'
import {setDisabledInput} from './../../../../redux/slices/laboriousnessSlice'
import {brakeChanges, updateContract, updatePlan, resetValue} from './../../../../redux/slices/contractsSlice'
import InputRowLab from './InputRowLab/InputRowLab';

const ActiveLaboriousness = () => {


    const dispatch = useDispatch();
    const {contract} = useSelector((state)=>state.contracts.activeContract);
    const {disabledInput, laboriousness} = useSelector((state)=>state.laboriousness);  
    const {areasDesc} = useSelector((state)=>state.contracts);

    
  const onClickEditButton = (bool)=>{
    dispatch(setDisabledInput(bool));
  }

  const onClickCancelButton = (bool)=>{    
    dispatch(setDisabledInput(bool));
    dispatch(brakeChanges());
  }
  const onClickSaveButton = (bool)=> { 
    dispatch(updateContract(contract));
    dispatch(setDisabledInput(bool));
  }
  const onClickReset = (bool)=> {    
    dispatch(resetValue({laboriousness, contract}));   
    
  }

  return (

    <div className={styles.root}>
         {(contract) && (<>

{ !disabledInput ? (
          <div className={styles.buttonBar}>
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton(true)} label={'Сохранить'}/> 
          <Button click={()=>onClickReset(true)} label={'Сброс значений'}/> 
      
          </div>
    ) :(  
          <div className={styles.buttonBar}>
          <Button click={()=>onClickEditButton(false)} label={'Редактировать'}/>
          </div>)
    }  



<div className={styles.label}>
    Трудоёмкости в минутах:
</div>

<div className={styles.headRow} >
<div>Арт.</div>
<div>Наименование</div>


            {
              areasDesc.map((item, i)=><div key = {i}>{item}</div>)
            }

</div>

  <div className={styles.products}>  
{
contract.products.map((product, index)=>(     
  

  <div key={index}>
    
    <InputRowLab disabledInput={disabledInput} product={product} index={index}/>
   
  </div>
 
))
}

</div>

</>)}
    </div>



  )
}

export default ActiveLaboriousness