const findLaboriousness = (laboriousness, code) => {

  
  let labItem = laboriousness.find((item)=> item.code == code);

  if(!labItem){
  labItem = {}
  labItem.areas = {...laboriousness[0].areas};
  for(let key in labItem.areas){            
   labItem.areas[key] = -1;            
   }
 }

 return labItem.areas; 

};

module.exports = findLaboriousness;
