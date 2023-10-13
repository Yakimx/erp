import React from 'react'
import Input from '../PlanEditor/InputRow/Input/Input'
import styles from './Resource.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {setDisabledInput, saveValue, updateValue, 
    setLastDate, 
    recalculationResources,
    setCheckBoxDate,    
    setDayResources,
    setAdjustment,
    submitResource,
    fetchResource,
    setStartTime,
   } from './../../../redux/slices/resourcesSlice'
import Button from '../../../elementsUI/Button/Button';
import UploadXml from './UploadXml/UploadXml';
import InputTime from './InputTime/InputTime';

const Resource = () => {

    const dispatch = useDispatch();
    const {allContracts, lastСontractDate} = useSelector((state)=>state.contracts);
    const {disabledInput, objResources } = useSelector((state)=>state.resources);
    const {lastDate, checkBoxDate } = objResources.config;
    const {resources } = objResources;    
    const {areas, areasDesc} = useSelector((state)=>state.contracts);


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

    const onChangeDayResources = (value,target)=>{
        dispatch(setDayResources({value,target}));
    }
    const onChangeStartTime = (value,target)=>{
      dispatch(setStartTime({value,target}));
  }
    
    const onChangeAdjustment= (value,target)=>{
      dispatch(setAdjustment({value,target}));
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
      {/* Ресурсы предприятия до 
     <input type="date" min={new Date().toLocaleDateString().split('.').reverse().join('-')} 
            onChange={(e)=>onChangeLastDate(e.target.value.split('-').reverse().join('.'))} 
            disabled={disabledInput || checkBoxDate} 
            value= {lastDate.split('.').reverse().join('-')}/> 
            {!disabledInput &&(
                   <div className={styles.checkbox}>
                   <input type="checkbox"
                          onChange={(e)=>onChangeCheckBoxDate(e.target.checked)}
                          checked={checkBoxDate} />
                    Дата последнего договора
                   </div>)
            } */}
                 
    </div> 
     
     <div className={styles.table}>  

       <div className={styles.headRow}>   
       <div></div>       
    
            {
              areasDesc.map((item, i)=><div key = {i}>{item}</div>)
            }
        
           
       </div>
      
    <div className={styles.rows}> 

    <div className={styles.row}>
    <div>Время начала</div>      

    {   
      areas.map((area,index)=>{
      return <InputTime key={index} setValue={(e)=>onChangeStartTime(e,area)} disabled={disabledInput} inputValue={resources.areas[area].startTime}/>
      })
    }      

    </div>


    <div className={styles.row}>
    <div>Доступно в день, минут</div>      

    {   
      areas.map((area,index)=>{
      return <Input key={index} setValue={(e)=>onChangeDayResources(e,area)} disabled={disabledInput} inputValue={resources.areas[area].dayResources}/>
      })
    }      

    </div>

    
    <div className={styles.row}>
    <div>Корректировка рабочие дни</div>    

    {   
      areas.map((area,index)=>{
      return <Input key = {index} setValue={(e)=>onChangeAdjustment(e,area)} disabled={disabledInput} inputValue={resources.areas[area].adjustment}/>
      })
    }   

    </div>

    <div className={styles.row}>
    <div>Всего рабочих дней до {lastDate}</div>

    {   
      areas.map((area,index)=>{
      return <div key = {index}>{resources.areas[area].allWorkDays}</div>
      })
    }   
    
    </div>
    
    <div className={styles.row}>
    <div>Ресурсы в распоряжении</div>

    {   
      areas.map((area,index)=>{
      return <div key = {index}>{resources.areas[area].totalResources}</div>
      })
    }   
    
    </div>

    <div className={styles.row}>
    <div>Требуемые ресурсы</div>

    {   
      areas.map((area,index)=>{
      return <div key = {index}>{resources.areas[area].requiredResources}</div>
      })
    } 
    
    </div>
    

                          
        
       
     
     </div>
     </div>
     </div>
     
  )
}

export default Resource