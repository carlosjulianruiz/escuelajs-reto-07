export const addToCart = payload => ({
  type: 'ADD_TO_CART',
  payload,
});

export const removeFromCart = index=>({
  type:'DELETE_FROM_CART',
  index,
});

export const calcularTotal=()=>({
  type:'CALCULAR_TOTAL',
});

export const productFilter = filtro =>({
  type: 'PRODUCT_FILTER',
  filtro,
});

export const productsListReset= () =>({
  type: 'PRODUCTS_LIST_RESET',
  
});

export const productsKeywordFilter=(keyword)=>({
  type: 'KEYWORD_FILTER',
  keyword,
})

export const handlerSendData=payload=>{
  type: 'SEND_DATA',
  payload
}