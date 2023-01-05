import React from "react";
import Search from "../Search/Search";
import styles from "./Table.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValueСustomer, setSearchValueContract, searchMatches, sortContracts} from '../../../redux/slices/filtrSlice'
import { setActiveContract} from '../../../redux/slices/contractsSlice'
import sortPNG from '../../../assets/img/sort.png'
import sortDisable from '../../../assets/img/sortDisable.png'

const Table = () => {

 const dispatch = useDispatch();
 const {searchValueСustomer, searchValueContract, filtrContract} = useSelector((state)=>state.filtr);
 const {allContracts, activeContract} = useSelector((state)=>state.contracts);

 React.useEffect(()=>{
  dispatch(searchMatches(allContracts));  
 },[allContracts, searchValueСustomer,searchValueContract])

//  React.useEffect(()=>{  
//   dispatch(setActiveContract(0)); 
//  },[])
  
const onChangeSort = ()=>{
  dispatch(sortContracts());
}

const onChangeContract = (num)=>{
  dispatch(setActiveContract(num));
}

return (
<div className={styles.root}>


<table className={styles.table}>
<tbody>
<tr> 
<th className={styles.thone}> № Дог. 
<Search value={searchValueContract} setValue={setSearchValueContract}/>
</th>
<th> Заказчик
<Search value={searchValueСustomer} setValue={setSearchValueСustomer}/>
</th>
<th> Срок по договору
<img className={styles.sortIcon} onClick={()=>onChangeSort()} src={sortPNG}/>
</th>
<th> Срок по плану
<img className={styles.sortIcon} onClick={()=>onChangeSort()} src={sortDisable}/>
</th>
<th> Статус</th>
</tr> 

{filtrContract.map((contract, index)=>(

<tr onClick={()=>onChangeContract(contract.contractNumber)} key={contract.contractNumber} className={activeContract.number==contract.contractNumber ? styles.activecontract : styles.inactivecontract}>

  <td>{contract.contractNumber} </td>
  <td>{contract.customer}</td>
  <td>{contract.startDate}</td>  
  <td>{contract.completionDatePlan}</td>
  <td>{contract.status}</td>
  
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
</div>
      
    
  );
};

export default Table;
