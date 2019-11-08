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
    // case 'SEND_DATA':
    //   return {
    //     // ...state,
    //     // fetch('https://www.bancaexportadora.com.co/api.php',{
    //     //   method:'post',
    //     //   body:JSON.stringify(state.cart),
    //     //   headers:{'Content-Type':'application/json'}
    //     // }).then(function(response){
    //     //   return response.json();
    //     // }).catch(err=>err);
    //   }      
          
    default:
      return state;
    }
    
  
}

export default reducer;