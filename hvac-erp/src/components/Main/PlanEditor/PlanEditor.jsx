import React from 'react'
import styles from './PlanEditor.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDisabledInput} from './../../../redux/slices/contractEditorSlice'
import {brakeChanges, updateContract, setDatePlan, 
  setTypeUpkp,
  setPause,
  setEquipment,
  setEquipmentDate,
  setShipped,} from './../../../redux/slices/contractsSlice'
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

  const onChangeCheckBoxUpkp = (bool)=>{
    dispatch(setTypeUpkp(bool));
  }
  const onChangeCheckBoxPause = (bool)=>{
    dispatch(setPause(bool));
  }
  const onChangeCheckBoxEquipment = (bool)=>{
    dispatch(setEquipment(bool));
  }
  const onChangeEquipmentDate = (bool)=>{
    dispatch(setEquipmentDate(bool));
  }
  const onChangeCheckBoxShipped = (bool)=>{
    dispatch(setShipped(bool));
  }
  

  return (
    <div className={styles.root}>


      {(contract) && (<> 
        <div className={styles.info}>
      
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
    <div className={styles.notChange}>
      <div>Заказчик: </div>
      <div className={styles.value}>{contract.customer}</div>
      {/* <div> Статус: </div>
      <div className={styles.value}>{contract.status} </div> */}
      <div>Дата подписания:</div>
      <div className={styles.value}>{contract.startDate}</div>
      <div>Срок по договору:</div>
      <div className={styles.value}>{contract.completionDateContract}</div>
      {/* <div>Дата по плану:</div>
      <div className={styles.value}>
      <input    className={styles.inputDate}
                type="date"
                //max={contract.completionDateContract.split('.').join('-')}
                disabled={true}
                onChange={(e) => onChangePlanDate(e.target.value.split('-').join('.'))}
                value={contract.completionDatePlan.split('.').reverse().join('-')} />       
      </div> */}
    
    </div>

    <div className={styles.change}>
    
    <div> Установки типа УПКП: </div>
    <input className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => onChangeCheckBoxUpkp(e.target.checked)}
                  disabled={disabledInput}
                  checked={contract.typeUpkp}
                />

    <div> Приостановлен: </div>
    <input className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => onChangeCheckBoxPause(e.target.checked)}
                  disabled={disabledInput}
                  checked={contract.pause}
                />

    <div> Комплектация: </div>
      <div className={styles.equipment}>
    <input className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => onChangeCheckBoxEquipment(e.target.checked)}
                  disabled={disabledInput}
                  checked={contract.equipment}
                />
    <input    className={styles.inputDate}
                hidden={contract.equipment}
                type="date"
                //max={contract.completionDateContract.split('.').join('-')}
                disabled={disabledInput}
                onChange={(e) => onChangeEquipmentDate(e.target.value.split('-').reverse().join('.'))}
                value={contract.equipmentDate.split('.').reverse().join('-')} />
      </div>
      <div> Отгружен: </div>
    <input className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => onChangeCheckBoxShipped(e.target.checked)}
                  disabled={disabledInput}
                  checked={contract.shipped}
                />
    </div>
    
    {/* completionDate: { type: String, default: "2088.05.31" },
  equipment: { type: Boolean, default: true }, */}
    
  </div>

  { !disabledInput ? 
  (
    <h1>Режим редактирования:</h1>   
  ):
  (   
    <h1>Продукция:</h1>  
  )}  
  </div>


  <div className={styles.table}>             
    

 
  

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
  


    
  </>)}
    </div>
)
}

export default PlanEditor

