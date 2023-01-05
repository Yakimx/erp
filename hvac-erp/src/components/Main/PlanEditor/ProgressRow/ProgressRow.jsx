import React from 'react'
import Input from '../InputRow/Input/Input'
import Progress from './Progress/Progress'
import styles from './ProgressRow.module.scss'

const ProgressRow = ({disabledInput, product}) => {
  return (
    <div className={styles.progressRow}>
      <div>{product.name}</div>
      <div>{product.quantity}</div>
      {/* <Input disabled={true} inputValue={product.name}/>
      <Input disabled={true} inputValue={product.quantity}/> */}
      <Progress max={product.quantity} value={product.quantityMade.documentation} required={product.resourcesRequired.documentation}/>
      <Progress max={product.quantity} value={product.quantityMade.automation} required={product.resourcesRequired.automation}/>
      <Progress max={product.quantity} value={product.quantityMade.cutting} required={product.resourcesRequired.cutting}/>
      <Progress max={product.quantity} value={product.quantityMade.sheetBender} required={product.resourcesRequired.sheetBender}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingA} required={product.resourcesRequired.assemblingA}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingB} required={product.resourcesRequired.assemblingB}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingC} required={product.resourcesRequired.assemblingC}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingSau} required={product.resourcesRequired.assemblingSau}/>
      
      
      </div>
  )
}

export default ProgressRow

