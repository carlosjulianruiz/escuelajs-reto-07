const reducer = (state, action) => {
  switch (action.type) {
    
    case 'UPDATE_PRODUCTS':{

      return {
        ...state,
        products:[1,2,3]
      }
    }

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
    case 'PRODUCT_FILTER':
      return {
        ...state,
        products: state.products.filter((item,index)=>item.category==action.filtro)
      }
    case 'PRODUCTS_LIST_RESET':
      return {
        ...state,
        products:state.productos_init
      }
    case 'KEYWORD_FILTER':
          return {
            ...state,
            products: state.products.filter((item,index)=>{
                       return item.title.indexOf(action.keyword.toUpperCase())>-1              
                        //console.log(item.title.indexOf(action.keyword.toUpperCase()));
                      })
          }
     
    case 'RESET_CART':
      return {
        ...state,
        cart:[]
      }
    
    case 'ADD_PAYMENT':
       return {
         ...state,
         payment:action.payment
       }
    default:
      return state;
    }
    
  
}

export default reducer;