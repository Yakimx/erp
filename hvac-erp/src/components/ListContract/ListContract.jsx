import React from 'react'
import styles from './ListContract.module.scss'
import Table from './Table/Table';
import UploadXml from '../Main/Resource/UploadXml/UploadXml';

const ListContract = () => {

// const dispatch = useDispatch();
// const {allContracts} = useSelector((state)=>state.contracts);    

  return (
    
        <div className={styles.listContract}>                 
            <Table /> 
        </div>
        
  )
}

export default ListContract