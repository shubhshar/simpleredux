//Action creators(person who is submitting the form)
const newBooking=(name,amount)=>{
  return {
    type:"NEW_BOOKING",
    payload:{
      name:name,
      amount:amount,
    }
  };
};

const cancelBooking=(name,refundAmount)=>{
  return{
    type:"CANCEL_BOOKING",
    payload:{
      name:name,
      refundAmount:refundAmount,
    }
  }
}

//Reducers

const reservationHistory = (oldReserList=[],action) =>{
  if(action.type==="NEW_BOOKING"){
    return [...oldReserList, action.payload]
  }
  else if(action.type==="CANCEL_BOOKING"){ 
    return oldReserList.filter(record=>{
      return record.name !==action.payload.name;
    })
  }
  return  oldReserList;
}

const cancellationHistory = (oldCancList=[],action) =>{
if(action.type==="CANCEL_BOOKING"){
  return[...oldCancList,action.payload]
}
return oldCancList;
}

const accounting =(totalAmount = 100,action)=>{
  if(action.type==="NEW_BOOKING"){
    return totalAmount + action.payload.amount;
  }
  else if(action.type==="CANCEL_BOOKING"){
    return totalAmount - action.payload.refundAmount;
  }
  return totalAmount;
}

//Redux Store

const {createStore,combineReducers}=Redux;

const reservCentralStore = combineReducers({
  reservationHistory:reservationHistory,
  accounting:accounting,
  cancellationHistory,
})

const store = createStore(reservCentralStore);

const action= newBooking("Shubham",200)
store.dispatch(action)
store.dispatch(newBooking("Nilesh",300));
store.dispatch(cancelBooking("Nilesh",300));
console.log(store.getState());

