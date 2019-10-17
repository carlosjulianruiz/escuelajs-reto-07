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
})