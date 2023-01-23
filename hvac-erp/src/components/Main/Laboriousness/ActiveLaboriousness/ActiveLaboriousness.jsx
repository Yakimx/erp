import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../elementsUI/Button/Button';

import styles from './ActiveLaboriousness.module.scss'
import {setDisabledInput} from './../../../../redux/slices/laboriousnessSlice'
import {brakeChanges, updateContract} from './../../../../redux/slices/contractsSlice'
import InputRowLab from './InputRowLab/InputRowLab';

const ActiveLaboriousness = () => {


    const dispatch = useDispatch();
    const {contract} = useSelector((state)=>state.contracts.activeContract);
    const {disabledInput} = useSelector((state)=>state.laboriousness);

    
  const onClickEditButton = (bool)=>{
    dispatch(setDisabledInput(bool));
  }

  const onClickCancelButton = (bool)=>{    
    dispatch(setDisabledInput(bool));
    dispatch(brakeChanges());
  }
  const onClickSaveButton = (bool)=>{
    dispatch(updateContract(contract));
    dispatch(setDisabledInput(bool));
  }

  return (

    <div className={styles.root}>
         {(contract) && (<>

{ !disabledInput ? (
          <div className={styles.buttonBar}>
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton(true)} label={'Сохранить'}/> 
      
          </div>
    ) :(  
          <div className={styles.buttonBar}>
          <Button click={()=>onClickEditButton(false)} label={'Редактировать'}/>
          </div>)
    }  



<div className={styles.label}>
    Трудоёмкости в часах:
</div>

<div className={styles.headRow} >

<div>Наименование</div>


<div>Документация</div>
<div>Документация САУ</div>
<div>Заготовка</div>
<div>Гибка</div>
<div>Сборка №1</div>
<div>Сборка №2</div>
<div>Сборка №3</div>
<div>Сборка САУ</div>

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