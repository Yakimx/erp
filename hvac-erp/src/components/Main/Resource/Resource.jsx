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
   } from './../../../redux/slices/resourcesSlice'
import Button from '../../../elementsUI/Button/Button';
import UploadXml from './UploadXml/UploadXml';

const Resource = () => {

    const dispatch = useDispatch();
    const {allContracts, lastСontractDate} = useSelector((state)=>state.contracts);
    const {disabledInput, objResources } = useSelector((state)=>state.resources);
    const {lastDate, checkBoxDate } = objResources.config;
    const {resources } = objResources;    
    const {areas} = useSelector((state)=>state.contracts);


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
      Ресурсы предприятия до 
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
            }
                 
    </div> 
     
     <div className={styles.table}>  

       <div className={styles.headRow}>   
       <div></div>       
       <div>Документация</div>
    <div>Снабжение</div>
    <div>Рубка</div>
    <div>Гибка</div>
    <div>Сварка</div>
    <div>Покраска</div>
    <div>Прокатка</div>
    <div>Балансировка</div>
    <div>Сборка ОП</div>
    <div>Сборка БВ</div>
    <div>Сборка МТФ</div>
    <div>Сборка УПКП</div>

    <div>Документация САУ</div>
    <div>Снабжение САУ</div>
    <div>Сборка САУ</div>
       
       </div>
      
    <div className={styles.rows}> 

    <div className={styles.row}>
    <div>Доступно в день</div>      

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
      return <Input setValue={(e)=>onChangeAdjustment(e,area)} disabled={disabledInput} inputValue={resources.areas[area].adjustment}/>
      })
    }   

    </div>

    <div className={styles.row}>
    <div>Всего рабочих дней до {lastDate}</div>

    {   
      areas.map((area,index)=>{
      return <div>{resources.areas[area].allWorkDays}</div>
      })
    }   
    
    </div>
    
    <div className={styles.row}>
    <div>Ресурсы в распоряжении</div>

    {   
      areas.map((area,index)=>{
      return <div>{resources.areas[area].totalResources}</div>
      })
    }   
    
    </div>

    <div className={styles.row}>
    <div>Требуемые ресурсы</div>

    {   
      areas.map((area,index)=>{
      return <div>{resources.areas[area].requiredResources}</div>
      })
    } 
    
    </div>
    

                          
        
       
     
     </div>
     </div>
     </div>
     
  )
}

export default Resource