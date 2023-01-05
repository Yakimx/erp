import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './Search.module.scss'
import searchSvg from '../../../assets/img/search.svg'


const SearchProduct = ({value, setValue}) => {

const dispatch = useDispatch();

const onChangeSearch = (e)=> {
dispatch(setValue(e.target.value));

}


  return (
    <div className={styles.root}>

    {!value && <img className = {styles.searchImg} src={searchSvg}></img> }    
    <input className = {styles.input}
        onChange={(e)=>onChangeSearch(e)} 
        placeholder = ''
        value={value}></input>
    
    </div> 

 
  )
}

export default SearchProduct