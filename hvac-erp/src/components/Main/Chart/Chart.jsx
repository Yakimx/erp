import React from 'react'
import ChartResources from './ChartResources/ChartResources'
import styles from './Chart.module.scss'

const Chart = () => {
  return (
    <div>
    <div className={styles.chart}>
      
    <ChartResources time={50} freeTime={400} label={'Конструкторский отдел'}/>
    <ChartResources time={900} freeTime={300} label={'Заготовка'}/>    
    <ChartResources time={20} freeTime={10} label={'Сборка'}/>
    {/* <ChartResources time={20} freeTime={10} label={'Сборка'}/>
    <ChartResources time={20} freeTime={10} label={'Сборка'}/> */}
    </div>
</div>
  )
}

export default Chart