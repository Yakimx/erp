import React from 'react'
import styles from './PlanEditor.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDisabledInput} from './../../../redux/slices/contractEditorSlice'
import {brakeChanges, updateContract} from './../../../redux/slices/contractsSlice'
import Button from '../../../elementsUI/Button/Button';

import ContractInfo from './ContractInfo/ContractInfo';
import Input from './InputRow/Input/Input';
import Progress from './ProgressRow/Progress/Progress';
import InputRow from './InputRow/InputRow';
import ProgressRow from './ProgressRow/ProgressRow';

const PlanEditor = () => {
  
  const dispatch = useDispatch();
  const {contract} = useSelector((state)=>state.contracts.activeContract);
  const {disabledInput} = useSelector((state)=>state.contractEditor);

  const onClickEditButton = (bool)=>{
    dispatch(setDisabledInput(bool));
  }

  const onClickCancelButton = (bool)=>{    
    dispatch(setDisabledInput(bool));
    dispatch(brakeChanges());
  }
  const onClickSaveButton = ()=>{
    dispatch(updateContract(contract));
    dispatch(setDisabledInput(true));
  }


  return (
    <div className={styles.root}>

      {(contract) && (<div>     
      
    { !disabledInput ? (
          <div className={styles.buttonBar}>
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton()} label={'Сохранить'}/> 
      
          </div>
    ) :(  
          <div className={styles.buttonBar}>
          {/* <Button  label={'Создать'}/> */}
          <Button click={()=>onClickEditButton(false)} label={'Редактировать'}/>
          </div>)
    }  
  

       

  
  <div className={styles.contractInfo}>    
    <ContractInfo label={'Статус:'} inputValue={contract.status}/>
    <ContractInfo label={'Заказчик:'} inputValue={contract.customer}/>
  </div>
  <div className={styles.contractDate}>
    <div>   
    <ContractInfo label={'Запущен:'} inputValue={contract.startDate}/>
    <ContractInfo label={'Готовность по плану:'} inputValue={contract.completionDatePlan}/>    
    </div> 
    <div>    
    <ContractInfo label={'Готовность по факту:'} inputValue={contract.completionDateFact}/>
    <ContractInfo label={'Готовность по договору:'} inputValue={contract.completionDateContract}/>
    </div>
  </div>

  


  <div className={styles.table}>      
  

  { !disabledInput ? 
  (
    <h1>Режим редактирования:</h1>   
  ):
  (   
    <h1>Продукция:</h1>  
  )}  
         
    

 
  

    <div className={styles.headRow} >

    <div>Наименование</div>
    
    <div>Кол-во</div>
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
      {!disabledInput ? (      
        <InputRow disabledInput={disabledInput} product={product} index={index} maxValue={product.quantity}/>
       ):(<ProgressRow disabledInput={disabledInput} product={product}/> )
        }      
      </div>
     
    ))
  }
  
  </div>


  </div>
  


    
  </div>)}
    </div>
)
}

export default PlanEditor

