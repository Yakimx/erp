import React from 'react'
import styles from './ListContract.module.scss'
import Table from './Table/Table';
import UploadXml from '../Main/Resource/UploadXml/UploadXml';

const Nav = () => {

// const dispatch = useDispatch();
// const {allContracts} = useSelector((state)=>state.contracts);    

  return (
    


       

        <div className={styles.listContract}>

        <div className={styles.headlist}>
            Договора в производстве 
            
        </div>            
            <Table /> 

        <div className={styles.footerlist}>
          <div>
          Всего договоров: 99 
          </div>
          <div>
          В работе: 10 
          </div>
          <div>
          Готово: 5 
          </div>
          <div>
          Приостановлено: 6
          </div>           
           
            
        </div>   

        </div>
        





  )
}

export default Nav