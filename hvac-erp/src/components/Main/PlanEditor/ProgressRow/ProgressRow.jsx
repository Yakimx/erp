import React from 'react'
import { useSelector } from 'react-redux'
import Input from '../InputRow/Input/Input'
import Progress from './Progress/Progress'
import styles from './ProgressRow.module.scss'

const ProgressRow = ({disabledInput, product}) => {

  const {areas} = useSelector((state)=>state.contracts);

  return (
    <div className={styles.progressRow}>
      <div>{product.name}</div>
      <div>{product.quantity}</div>

      {
        areas.map((key, i)=>{
          return <Progress key={i} max={product.quantity} value={product.quantityMade[key]} required={product.resourcesRequired[key]}/>
        })
      }

      {/* <Progress max={product.quantity} value={product.quantityMade.documentation} required={product.resourcesRequired.documentation}/>
      <Progress max={product.quantity} value={product.quantityMade.delivery} required={product.resourcesRequired.delivery}/>
      <Progress max={product.quantity} value={product.quantityMade.cutting} required={product.resourcesRequired.cutting}/>
      <Progress max={product.quantity} value={product.quantityMade.sheetBender} required={product.resourcesRequired.sheetBender}/>
      <Progress max={product.quantity} value={product.quantityMade.welding} required={product.resourcesRequired.welding}/>
      <Progress max={product.quantity} value={product.quantityMade.painting} required={product.resourcesRequired.painting}/>
      <Progress max={product.quantity} value={product.quantityMade.rolling} required={product.resourcesRequired.rolling}/>
      <Progress max={product.quantity} value={product.quantityMade.balancing} required={product.resourcesRequired.balancing}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingOP} required={product.resourcesRequired.assemblingOP}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingBV} required={product.resourcesRequired.assemblingBV}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingMTF} required={product.resourcesRequired.assemblingMTF}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingUPKP} required={product.resourcesRequired.assemblingUPKP}/>
      <Progress max={product.quantity} value={product.quantityMade.documentationSAU} required={product.resourcesRequired.documentationSAU}/>
      <Progress max={product.quantity} value={product.quantityMade.deliverySAU} required={product.resourcesRequired.deliverySAU}/>
      <Progress max={product.quantity} value={product.quantityMade.assemblingSAU} required={product.resourcesRequired.assemblingSAU}/> */}
      


      </div>
  )
}

export default ProgressRow

