import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../elementsUI/Button/Button';
import styles from './UploadXml.module.scss';
import { submitFile } from '../../../../redux/slices/resourcesSlice';
import ModalLoad from '../ModalLoad/ModalLoad';


const UploadXml = () => {

  const [isFile, setIsFile] = useState(0);
  const [file, setFile] = useState(0);
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);

  const uploadFile = (e)=>{
    
    if (e.target.files[0]) {
      setIsFile(true);
      setFile(e.target.files[0]);    
        
  }else setIsFile(false);

  }

  const onClickSubmitButton = (file)=>{   
   // setModalActive(true); 
    dispatch(submitFile(file));
    
  }



  return (
    <div className={styles.root}>
    
    <input className={styles.root}
        onChange={(e)=>uploadFile(e)}
        accept=".xml"
        type="file"
        
      />

<Button disabled={!isFile} click={()=>onClickSubmitButton(file)} label={'Синхронизировать данные'}/>
{modalActive && (<ModalLoad active={modalActive} setActive={setModalActive}/>)} 


      </div>
  )
}

export default UploadXml