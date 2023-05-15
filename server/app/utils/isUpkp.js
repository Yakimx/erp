const isUpkp = (items) => {
   let check = items.find(item=>{
       return item.$.name.toUpperCase().includes('УПКП');
    }) 
    console.log(check)
    return check === undefined ? false : true;

  };
  
module.exports = isUpkp;
  