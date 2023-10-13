import React from 'react'
import styles from "./DefaultLaboriousness.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { setActiveItem,
  fetchLaboriousness,
  addLaboriousness,
 
  updateLaboriousness,  
  setDisabledInput, 
  
 
  } from '../../../../redux/slices/laboriousnessSlice';
import Button from '../../../../elementsUI/Button/Button';
import InputRowLabDef from './InputRowLabDef/InputRowLabDef';


const DefaultLaboriousness = () => {

  const dispatch = useDispatch();
  const {status, disabledInput, laboriousness, activeItem} = useSelector((state)=>state.laboriousness);
  const {areasDesc} = useSelector((state)=>state.contracts);
  
  const onClickEditButton = (bool)=>{
    dispatch(setDisabledInput(bool));
  }

  const onClickCancelButton = (bool)=>{    
    dispatch(setDisabledInput(bool));
    dispatch(fetchLaboriousness()); 
  }
  const onClickSaveButton = async (bool)=>{
    await dispatch(updateLaboriousness(laboriousness));
    dispatch(setDisabledInput(bool));
    dispatch(fetchLaboriousness()); 
  }  
  const onClickAddButton = async ()=>{
    await dispatch(addLaboriousness({name:"Новая позиция "+laboriousness.length})); 
    dispatch(fetchLaboriousness());  
  }





  return (
    <div className={styles.root}>

{(laboriousness) && (<>     
      
      { !disabledInput ? (
        <div className={styles.wrap}> 
            <div className={styles.buttonBar}>
            <Button click={()=>onClickCancelButton(true)} label={'Отмена'}/>
            <Button click={()=>onClickSaveButton(true)} label={'Сохранить'}/> 
            <Button click={()=>onClickAddButton()} label={'Создать'}/>
            
        
            </div>
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

<div className={styles.laboriousness}>  
{
laboriousness.map((laboriousnes, index)=>(     
  

  <div key={index}>
    
    <InputRowLabDef  disabledInput={disabledInput} laboriousnes={laboriousnes} index={index}/>
   
  </div>
 
))
}

</div>

      
    
</>)} 

    </div>
  )
}

export default DefaultLaboriousness