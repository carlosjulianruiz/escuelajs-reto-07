import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { updateProducts, addToCart, productFilter, productsListReset,productsKeywordFilter } from '../actions';
import '../styles/components/Products.styl';
import { applyMiddleware } from 'redux';

const Products = (props) => {
  const { products, cart } = props;

 const productSearch= React.createRef(); 


 const updateProducts=(products)=>{
  props.updateProducts(products);
}

  const handleAddToCart = (product) => {
    props.addToCart(product);
  }

  const handlerProductsReset=()=>{
    props.productsListReset()
  }

  const handleProductFilter=()=>{
    let keyword=event.target.value
    props.productsListReset()
    if(keyword!=="*"){
      props.productFilter(keyword)
    }
  }

  const handleProductsKeyword=()=>{
    let keyword=event.target.value
    props.productsListReset()
    if(keyword!=""){
    props.productsKeywordFilter(keyword)
     } 
    } 

  return (
    <div className="Products">
      <div className="Products-search">
        <div className="Product-search_input"><input type="text" placeholder="" ref={productSearch} onKeyUp={handleProductsKeyword} /></div>
        <div className="Product-search_icon"><i className='fas fa-search'></i></div>
      </div>
      <div className="Products-MenuCategories">

        <button className="Products-MenuCategories_button" value="CAFE" onClick={handleProductFilter}>Café</button>
        <button className="Products-MenuCategories_button" value="MENU" onClick={handleProductFilter}>Menu</button>
        <button className="Products-MenuCategories_button" value="ACCESORIOS" onClick={handleProductFilter}>Accesorios</button>
        <button className="Products-MenuCategories_button" value="MERCHANDISING" onClick={handleProductFilter}>Merchandising</button>
        <button className="Products-MenuCategories_button" value="*" onClick={handleProductFilter}>Todos</button>

      </div>
      <div className="Products-items">
        {products.map(product => (
          <div className="Products-item" key={product.id} >
              <div className="Product-item_foto" onClick={() => handleAddToCart(product)}>
                <img src={product.image} alt={product.title} />
              </div>
              <div className="Products-item-info" onClick={() => handleAddToCart(product)}>
              <h2>
                {product.title}
                <span>
                  $
                  {product.price}
                </span>
              </h2>
              <p>{product.description}</p>
            </div>
            {/* <button type="button" onClick={() => handleAddToCart(product)}>Comprar</button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  addToCart,
  productFilter,
  productsListReset,
  productsKeywordFilter,
  updateProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);