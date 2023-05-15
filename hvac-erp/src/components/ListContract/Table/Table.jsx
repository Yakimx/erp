import React, { useState } from "react";
import Search from "../Search/Search";
import styles from "./Table.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValueСustomer, setSearchValueContract, filtrList, sortContractDate, 
  sortPlanDate} from '../../../redux/slices/filtrSlice'
import { setActiveContract, setActiveContractDate} from '../../../redux/slices/contractsSlice'
import sortPNG from '../../../assets/img/sort.png'
import sortDisable from '../../../assets/img/sortDisable.png'
import ModalFiltr from "../ModalFiltr/ModalFiltr";


const Table = () => {

 const dispatch = useDispatch();
//  const {searchValueСustomer, searchValueContract, filtrContract,
//    activeSortContractDate, 
//    activeSortPlanDate, 
//    upSortContractDate, 
//    upSortPlanDate, 
//    checkBoxUpkp, 
//    checkBoxOther,filtrState} = useSelector((state)=>state.filtr);

 const {filtrContract, filtrState, 
  qtyAllContracts,
  qtyReadyContracts,
  qtyPauseContracts,} = useSelector((state)=>state.filtr);

 const {allContracts, activeContract} = useSelector((state)=>state.contracts);
 const plan = useSelector((state)=>state.plan);

 const [modalActive, setModalActive] = useState(false);


 React.useEffect(()=>{
  dispatch(filtrList({allContracts, plan}));    
 },[allContracts, filtrState, plan]);

 React.useEffect(()=>{
  dispatch(sortContractDate(allContracts));
 },[]);


  
const onChangeSortContractDate = ()=>{ 
  dispatch(sortContractDate(allContracts));
}
const onChangeSortPlanDate = ()=>{ 
  dispatch(sortPlanDate(allContracts));
}

const onChangeContract = (num)=>{
  dispatch(setActiveContract(num));

  let contract = filtrContract.find(contract => contract.contractNumber == activeContract.number);

  dispatch(setActiveContractDate({contract}));
}

// const clickFiltr = (bool)=>{
//   console.log(bool)
//   setModalActive(bool);
// }

return (
<div className={styles.root}>

<div className={styles.headlist}>
Договора в производстве             
</div> 

<table className={styles.table}>
<tbody>
<tr> 
<th className={styles.thone}> № Дог. 
<Search value={filtrState.searchValueContract} setValue={setSearchValueContract}/>
</th>
<th> Заказчик
<Search value={filtrState.searchValueСustomer} setValue={setSearchValueСustomer}/>
</th>
<th > Срок по договору
<img className={`${filtrState.upSortContractDate == true ? styles.sortIconUp : styles.sortIconDown} ${filtrState.activeSortContractDate == true ? styles.iconActive : styles.iconInactive}` } 
onClick={()=>onChangeSortContractDate()} 
src={sortPNG}/>
</th>
<th> Срок по плану
<img className={`${filtrState.upSortPlanDate == true ? styles.sortIconUp : styles.sortIconDown} ${filtrState.activeSortPlanDate == true ? styles.iconActive : styles.iconInactive}` } 
onClick={()=>onChangeSortPlanDate()} 
src={sortPNG}/>
</th>
<th> Статус
<img className={styles.filtrIcon} onClick={()=>setModalActive(true)}  src={sortDisable}/> 

</th>
</tr> 

{filtrContract.map((contract, index)=>(

<tr onClick={()=>onChangeContract(contract.contractNumber)} key={contract.contractNumber} className={activeContract.number==contract.contractNumber ? styles.activecontract : styles.inactivecontract}>

  <td>{contract.contractNumber} </td>
  <td>{contract.customer}</td>
  <td>{contract.completionDateContract}</td>  
  <td>{contract.completionDatePlan == '01.01.1970' ? "" : contract.completionDatePlan}</td>
  <td className={contract.shipped ? styles.statusShipped 
    : contract.ready == true ? styles.statusReady 
    : contract.pause == true ? styles.statusPause
    : Date.parse(contract.completionDateContract.split('.').reverse().join('.')) < Date.parse(contract.completionDatePlan.split('.').reverse().join('.')) ? styles.statusOverdue 
    : styles.statusPending}>{contract.status}</td>



</tr>

))}

</tbody>
</table>

{
  filtrContract.length == 0 && (
    <div className={styles.notfound}>Упс! Не удалось ничего найти(((  &#128557;
     
      </div>
  )
}


<div className={styles.footerlist}>

          <div>
          Всего договоров: {qtyAllContracts}
          </div>
          <div>
          Готово к отгрузке:  {qtyReadyContracts}
          </div>
          <div>
          Приостановлено: {qtyPauseContracts}
          </div>  
</div>   
{modalActive && (<ModalFiltr active={modalActive} setActive={setModalActive}/>)} 
</div>
      
    
  );
};

export default Table;
