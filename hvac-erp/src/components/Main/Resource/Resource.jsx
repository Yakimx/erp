import React from 'react'
import Input from '../PlanEditor/InputRow/Input/Input'
import styles from './Resource.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDisabledInput, saveValue, updateValue, 
    setLastDate, 
    recalculationResources,
    setCheckBoxDate,
    setDocumentationDayResources,
    setDocumentationAdjustment,
    setCuttingDayResources,
    setCuttingAdjustment,
    setSheetBenderDayResources,
    setSheetBenderAdjustment,
    setAssemblingADayResources,
    setAssemblingAAdjustment,
    setAssemblingBDayResources,
    setAssemblingBAdjustment,
    setAssemblingCDayResources,
    setAssemblingCAdjustment,
    setAssemblingSauDayResources,
    setAssemblingSauAdjustment,
    setAutomationDayResources,
    setAutomationAdjustment,
    submitResource,
    fetchResource,
   } from './../../../redux/slices/resourcesSlice'
import Button from '../../../elementsUI/Button/Button';
import UploadXml from './UploadXml/UploadXml';

const Resource = () => {

    const dispatch = useDispatch();
    const {allContracts, lastСontractDate} = useSelector((state)=>state.contracts);
    const {disabledInput, objResources } = useSelector((state)=>state.resources);
    const {lastDate, checkBoxDate } = objResources.config;
    const {resources } = objResources;    

  React.useEffect(()=>{
    dispatch(recalculationResources());
},[resources,lastDate])

    const onClickEditButton = (bool)=>{
        dispatch(setDisabledInput(bool));
      }
    const onClickSaveButton = ()=>{
        dispatch(saveValue());
        dispatch(setDisabledInput(true));
        dispatch(submitResource(objResources)); 
      }
    const onClickCancelButton = ()=>{
        //dispatch(updateValue()); 
        //dispatch(fetchResource(objResources)); 
        dispatch(setDisabledInput(true));
        dispatch(fetchResource()); 
      }

    const onChangeInput = (e,setValue)=>{
        dispatch(setValue(e));
    }

    const onChangeLastDate = (e)=>{
        dispatch(setLastDate(e));
    }
    const onChangeCheckBoxDate = (e)=>{        
       dispatch(setCheckBoxDate({e, lastСontractDate}));
    }



  return (

    <div className={styles.root}>

    { !disabledInput ? (
          <div className={styles.buttonBar}>         
          <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
          <Button click={()=>onClickSaveButton()} label={'Сохранить'}/>
          <UploadXml />    
          </div>
    ) :(  
          <div className={styles.buttonBar}>          
          <Button click={()=>onClickEditButton(false)} label={'Редактировать'}/>
          </div>)
    }  
    
    
    
     <div className={styles.date}>
      Ресурсы предприятия до 
     <input type="date" min={new Date().toLocaleDateString().split('.').reverse().join('-')} 
            onChange={(e)=>onChangeLastDate(e.target.value)} 
            disabled={disabledInput || checkBoxDate} 
            value= {lastDate}/> 
            {!disabledInput &&(
                   <div className={styles.checkbox}>
                   <input type="checkbox"
                          onChange={(e)=>onChangeCheckBoxDate(e.target.checked)}
                          checked={checkBoxDate} />
                    Дата последнего договора
                   </div>)
            }
                 
    </div> 
     
     <div className={styles.table}>  

       <div className={styles.headRow}>   
       <div></div>       
       <div>Документация </div>
       <div>Документация САУ</div>
       <div>Заготовка</div>
       <div>Гибка</div>
       <div>Сборка №1</div>
       <div>Сборка №2</div>
       <div>Сборка №3</div>
       <div>Сборка САУ</div>
       
       </div>
      
    <div className={styles.rows}> 

    <div className={styles.row}>
    <div>Доступно в день</div>     
    <Input setValue={(e)=>onChangeInput(e,setDocumentationDayResources)} disabled={disabledInput} inputValue={resources.documentation.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setAutomationDayResources)} disabled={disabledInput} inputValue={resources.automation.dayResources}/> 
    <Input setValue={(e)=>onChangeInput(e,setCuttingDayResources)} disabled={disabledInput} inputValue={resources.cutting.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setSheetBenderDayResources)} disabled={disabledInput} inputValue={resources.sheetBender.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingADayResources)} disabled={disabledInput} inputValue={resources.assemblingA.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingBDayResources)} disabled={disabledInput} inputValue={resources.assemblingB.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingCDayResources)} disabled={disabledInput} inputValue={resources.assemblingC.dayResources}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingSauDayResources)} disabled={disabledInput} inputValue={resources.assemblingSau.dayResources}/>
      
    </div>

    
    <div className={styles.row}>
    <div>Корректировка рабочие дни</div>     
    <Input setValue={(e)=>onChangeInput(e,setDocumentationAdjustment)} disabled={disabledInput} inputValue={resources.documentation.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setAutomationAdjustment)} disabled={disabledInput} inputValue={resources.automation.adjustment}/> 
    <Input setValue={(e)=>onChangeInput(e,setCuttingAdjustment)} disabled={disabledInput} inputValue={resources.cutting.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setSheetBenderAdjustment)} disabled={disabledInput} inputValue={resources.sheetBender.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingAAdjustment)} disabled={disabledInput} inputValue={resources.assemblingA.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingBAdjustment)} disabled={disabledInput} inputValue={resources.assemblingB.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingCAdjustment)} disabled={disabledInput} inputValue={resources.assemblingC.adjustment}/>
    <Input setValue={(e)=>onChangeInput(e,setAssemblingSauAdjustment)} disabled={disabledInput} inputValue={resources.assemblingSau.adjustment}/>
    
    </div>

    <div className={styles.row}>
    <div>Всего рабочих дней до {lastDate}</div>
    <div>{resources.documentation.allWorkDays}</div>
    <div>{resources.automation.allWorkDays}</div>
    <div>{resources.cutting.allWorkDays}</div>
    <div>{resources.sheetBender.allWorkDays}</div>
    <div>{resources.assemblingA.allWorkDays}</div>
    <div>{resources.assemblingB.allWorkDays}</div>
    <div>{resources.assemblingC.allWorkDays}</div>
    <div>{resources.assemblingSau.allWorkDays}</div>
    
    </div>
    
    <div className={styles.row}>
    <div>Ресурсы в распоряжении</div>
    <div>{resources.documentation.totalResources}</div>
    <div>{resources.automation.totalResources}</div>
    <div>{resources.cutting.totalResources}</div>
    <div>{resources.sheetBender.totalResources}</div>
    <div>{resources.assemblingA.totalResources}</div>
    <div>{resources.assemblingB.totalResources}</div>
    <div>{resources.assemblingC.totalResources}</div>
    <div>{resources.assemblingSau.totalResources}</div>
    
    </div>

    <div className={styles.row}>
    <div>Требуемые ресурсы</div>
    <div>{resources.documentation.requiredResources}</div>
    <div>{resources.automation.requiredResources}</div>
    <div>{resources.cutting.requiredResources}</div>
    <div>{resources.sheetBender.requiredResources}</div>
    <div>{resources.assemblingA.requiredResources}</div>
    <div>{resources.assemblingB.requiredResources}</div>
    <div>{resources.assemblingC.requiredResources}</div>
    <div>{resources.assemblingSau.requiredResources}</div>
    
    </div>
    

                          
        
       
     
     </div>
     </div>
     </div>
     
  )
}

export default Resource