import React from "react";
import { fetchContracts } from "./redux/slices/contractsSlice";
import { fetchResource } from './redux/slices/resourcesSlice';
import { useDispatch, useSelector } from "react-redux";
import { setPlan} from '../src/redux/slices/planSlice';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ListContract from "./components/ListContract/ListContract";

import styles from "./App.module.scss";
import Loader from "./elementsUI/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const { status, allContracts, areas } = useSelector((state) => state.contracts);
  const { objResources } = useSelector((state) => state.resources);
  const { statusSubmitFile } = useSelector((state) => state.resources);
  const statusResources = useSelector((state) => state.resources.status);
  

  const getContracts = async () => {
    dispatch(fetchContracts());
  };
  const getResource = async () => {  
    dispatch(fetchResource());
  };

  React.useEffect(() => {
    if (statusSubmitFile == "success") {      
      getContracts();
      //console.log(allContracts);
    }
  }, [statusSubmitFile]);

  React.useEffect(() => { 
    if (status != "success") getResource();
  }, []);


//const { objResources } = useSelector((state) => state.resources);
//const { allContracts } = useSelector((state) => state.contracts);
React.useEffect(() => { 
  if (status == "success" && statusResources == "success") dispatch(setPlan({ allContracts, objResources, areas }));
}, [allContracts]);

  return (
    
    <div className={styles.app}>


      <div className={styles.header}>
        <Header />
      </div>
      {(status == "success" && statusResources == "success") && (
        <>
        <div className={styles.main}>
            <Main />
            
          </div>

        <div className={styles.listContract}>
            <ListContract />            
        </div>

        {/* <Loader /> */}
          
        </>
      )}
    </div>
  );
}

export default App;
