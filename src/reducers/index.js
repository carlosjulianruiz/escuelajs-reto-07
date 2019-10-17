const reducer = (state, action) => {
  switch (action.type) {
    case 'CALCULAR_TOTAL':{
      return {
        ...state,
      }
    }
    case 'DELETE_FROM_CART':
      return{
        ...state,
        cart: state.cart.filter((item,index)=>index!==action.index)
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    default:
      return state;
    }
    
}

export default reducer;