import React from "react";
import { fetchContracts } from "./redux/slices/contractsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ListContract from "./components/ListContract/ListContract";

import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const { status, allContracts } = useSelector((state) => state.contracts);
  const { statusSubmitFile } = useSelector((state) => state.resources);

  const getContracts = async () => {
    dispatch(fetchContracts());
  };

  React.useEffect(() => {
    if (statusSubmitFile == "success") {
      getContracts();
      console.log(allContracts);
    }
  }, [statusSubmitFile]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Header />
      </div>
      {status == "success" && (
        <>
          <div className={styles.listContract}>
            <ListContract />
          </div>

          <div className={styles.main}>
            <Main />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
