import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDatePlan } from '../../../../redux/slices/filtrSlice';

import Button from "../../../../elementsUI/Button/Button";
import {
  //setValueNotConfirmed,
  setDisabledInput,
  saveValue,
  updateValue,
  setPlan,
  setActive,
} from "../../../../redux/slices/planSlice";
import {
  fetchContracts,
  updateNotConfirmed,
  updatePlan,
  setNotConfirmed,
} from "../../../../redux/slices/contractsSlice";
import {
  setStartDate,
  setCheckBoxStartDate,
  submitResource,
} from "../../../../redux/slices/resourcesSlice";

import ProductRow from "../ProductRow/ProductRow";
import styles from "./Plan.module.scss";

const Plan = ({ plan, type }) => {
  
  const dispatch = useDispatch();
  // const {disabledInput} = useSelector((state)=>state.plan);
  const planState = useSelector((state) => state.plan);
  const { disabledInput } = planState;
  const { objResources } = useSelector((state) => state.resources);
  const { allContracts, areas } = useSelector((state) => state.contracts);
  const { startPlanDate, checkBoxStartDate } = objResources.config;

  //const [highlight, setHighlight] = useState(startPlanDate);
    const [highlight, setHighlight] = useState();
  
  // React.useEffect(() => { 
  //   dispatch(setDatePlan(planState));
  // }, [planState]);


  const onChangeProduct = (index) => {
    dispatch(setActive(index));
  };

  const onClickEditButton = (bool) => {
    dispatch(setDisabledInput(bool));
  };

  const onClickSaveButton = (bool) => {
    dispatch(updateNotConfirmed(allContracts));    
    //dispatch(fetchContracts());
    dispatch(setDisabledInput(bool));
    
  };
  const onClickCancelButton = () => {
    dispatch(setPlan({ allContracts, objResources, areas }));
    dispatch(fetchContracts());
    dispatch(setDisabledInput(true));
  };

  const onClickUpdateButton = async (bool) => {
    await dispatch(submitResource(objResources));
    await dispatch(updatePlan());
    await dispatch(fetchContracts());    
    dispatch(setDisabledInput(bool));
  };

  const onChangeInput = (obj) => {    
    dispatch(setNotConfirmed(obj));
  };

  const onChangeLastDate = (e) => {
    dispatch(setStartDate(e));
  };
  const onChangeCheckBoxDate = (e) => {
    const today = new Date()
      .toLocaleDateString()
    dispatch(setCheckBoxStartDate({ e, today }));
  };



  return (
    <div className={styles.root}>
      <div className={styles.buttonBar}>
        {!disabledInput ? (
          <div className={styles.buttonBar}>
            <Button click={() => onClickCancelButton(true)} label={"Отмена"} />
            <Button click={() => onClickSaveButton(true)} label={"Сохранить"} />
            <div className={styles.updatePlan}>
              Дата начала нового плана:
              <input
                type="date"
                min={new Date()
                  .toLocaleDateString()
                  .split(".")
                  .reverse()
                  .join("-")}
                onChange={(e) => onChangeLastDate(e.target.value.split('-').reverse().join('.'))}
                disabled={disabledInput || checkBoxStartDate}
                value={startPlanDate.split('.').reverse().join('-')}
              />
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  onChange={(e) => onChangeCheckBoxDate(e.target.checked)}
                  checked={checkBoxStartDate}
                />
                Сегодня
              </div>
              <Button
                click={() => onClickUpdateButton(startPlanDate)}
                label={"Обновить план"}
              />
            </div>
          </div>
        ) : (
          <div className={styles.buttonBarNoActive}>
            <Button
              click={() => onClickEditButton(false)}
              label={"Редактировать"}
            />
            {/* <input className={styles.highlight}
                type="date"
                onChange={(e) => setHighlight(e.target.value.split('-').reverse().join('.'))}
                value={highlight.split('.').reverse().join('-')}
              />  */}
          </div>
          
        )}
              

              
      </div>
      

      <div className={styles.head}>
        <div>№ договора</div>
        <div>Наименование</div>
        <div>Выполнено всего</div>
        <div>Необходимо выполнить</div>
        <div className={styles.datePlan}>        
        <div>Начало по плану</div>
        <div>Готовность по плану</div>
        <div>Ресурс дня</div>
        </div>
        <div>Договор/Желаемая</div>
        
      </div>

      <div className={styles.list}> 
        {                  
        plan.itemsPlan.length != 0
          ? plan.itemsPlan.map((item, index) => {
            //console.log(allContracts[item.indexContract].products[item.indexItem].quantityNotConfirmed[type])
            let quantityNotConfirmed = allContracts[item.indexContract].products[item.indexItem].quantityNotConfirmed[type]; 
              
             return <div key={item.id}>
            
                
                {/* //<div className={styles.date}>{dayPlan.date}</div>      */}
                                            
                      <div className={planState.active == item.id ? styles.productRowActive : styles.productRowInactive}
                            onClick={()=>onChangeProduct(item.id)}>
                        <ProductRow                          
                          number={item.contractNumber}
                          product={item}
                          inputValue = {quantityNotConfirmed}
                          disabledInput={disabledInput}
                          indexContract = {item.indexContract}
                          indexItem = {item.indexItem} 
                          type = {type}
                          active ={planState.active == item.id}
                          highlight = {highlight}
                          setValue={(value) =>
                            onChangeInput({
                              indexContract: item.indexContract,
                              indexItem: item.indexItem,                     
                              value,                          
                              type,
                            })
                          }
                        />
                      
                    </div>
                  
                
                
              </div>
            })
          : "План пуст"}
      </div>
    </div>
  );
};

export default Plan;
