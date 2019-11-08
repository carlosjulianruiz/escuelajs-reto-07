import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import '../styles/components/Menu.styl'
import { METHODS } from 'http';
import axios from 'axios'
import checkout from '../containers/Checkout'


class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isMenuOpen: false,
      classRow:"menuRow",
      cart:props.cart,
    
  }
  }
  

   
    toggleMenu=()=>{
        this.setState({
            isMenuOpen:!this.state.isMenuOpen
        });
        this.toChangeClassNames()
    }

    toChangeClassNames=()=>{
        // eslint-disable-next-line react/destructuring-assignment
        if(this.state.isMenuOpen){
            this.setState({
                classRow:'menuRow'
            });
        } else {
            this.setState({
                classRow:'menuRowOpen'
            });
        }
       
    
    }

    toPrintInvoice=(data,fecha,id)=>{
      let ePosDev = new epson.ePOSDevice();
      function connect() {
          let ipAddress = '192.168.0.100';
          let port = '8008';
          ePosDev.connect(ipAddress, port, callback_connect);
      }

      function callback_connect(resultConnect) {
          let deviceId = 'local_printer';
          let options = { 'crypto': false, 'buffer': false };
          console.log(resultConnect)
          // document.getElementById("resultadoConeccion").innerHTML=resultConnect;
          if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) {
              // Retrieves the Printer object

              console.log("coneccion ok")
              ePosDev.createDevice(deviceId, ePosDev.DEVICE_TYPE_PRINTER, options,
                  callback_createDevice);
          }
          else {

              console.log("No hay coneccion con la impresora")
              // Displays error messages
          }
      }

      let printer = null;
      
      function callback_createDevice(deviceObj, errorCode) {
          if (deviceObj === null) {
              // Displays an error message if the system fails to retrieve the Printer object
              return;
          }
          printer = deviceObj;
          createData(data)
          send()
          
          // Registers the print complete event
          printer.onreceive = function (response) {
              if (response.success) {
                  // Displays the successful print message
              }
              else {
                  // Displays error messages
              }
          };
      };

      function createData(data,fecha,id) {
          
          this.printer.addTextAlign(printer.ALIGN_CENTER);
          this.printer.addText("CAFE 18 - TOP 5 COFFEE SHOP SAS \n");
          this.printer.addText("REGIMEN COMUN\n");
          this.printer.addText("FACTURA DE VENTA\n");
          // printer.addText("CRA 9 70A 35 PISO 5\n");
          // printer.addText("7448219 BOGOTA\n");
          // printer.addText("NIT 901011846-1\n");
          // printer.addFeedLine(2);
          // printer.addText(`factura No: ${id}\n`);
          // printer.addText(`fecha: ${fecha}\n`);
          // let total=0;
          // let ipoconsumo=0;
          // let iva=0;
          // let iva5=0;

          
          //    data.map((item,index)=>{
          //      printer.addText(`${item.title} $ ${item.price}\n`);
          //      total+=item.price;
          //      if(item.category==="MENU"){
          //        ipoconsumo+=item.price/(0.08)
          //      }
          //      if(item.category==="CAFE"){
          //       iva5=ipoconsumo+item.price/(0.05)
          //     }
          //     if(item.category==="ACCESORIOS"){
          //       iva+=item.price/(0.19)
          //     }
          //     if(item.category==="MERCHANDISING"){
          //       iva+=item.price/(0.19)
          //     }
          // })
          
          // printer.addText(`Imp Consumo :$ ${ipoconsumo}\n`);
          // printer.addText(`Iva 5% :$ ${iva5}\n`);
          // printer.addText(`Iva 19% :$ ${iva}\n`);
          // printer.addText(`TOTAL :$ ${total}\n`);
          // printer.addText("www.cafe18.com.co\n");
          // printer.addFeedLine(2);
          // printer.addText("Resolucion Dian 18763001160908 del 20-10-2019\n");
          // printer.addText("Del numero del 401 al 600 vigencia 24 meses\n");
          // printer.addFeedLine(5);
          // printer.addCut(printer.CUT_FEED);
          // printer.addFeedLine(4);
          // printer.addText("Comanda para el barista");
          // data.map((item,index)=>{
          // printer.addText(`${item.title} $ ${item.price}\n`);
           
           // })
            printer.addCut(printer.CUT_FEED);

          
      } 

      
      function send() {
          if (ePosDev.isConnected) {
              printer.send();
          }
      }
       connect();
      }

    sendData=()=>{
      if(this.state.cart.length>0){
      axios.post(`https://www.bancaexportadora.com.co/api/crear.php?clave=banexport_59623&datos=${JSON.stringify(this.state.cart)}`)
      .then(res=>{
        console.log(res);
        console.log(res.data);
        
        
        this.toPrintInvoice(this.state.cart,res.data.fecha,res.data.id);



      })
      }
      } 
  

    
    render() {
        
        return (
            
          <div className='menuContainer'>

            <div className="Checkout">
  <div className="Checkout-content">
        {this.state.cart.length > 0 ? <h3>Lista de Pedidos:</h3> : <h2>Sin Pedidos</h2>}
        
        {this.state.cart.map((item,index) => (
          <div className="Checkout-item" key={index}>
            <div className="Checkout-element">
              <h4>{item.title}</h4>
              <span>
                $
                {item.price}
              </span>
            </div>
            <i className="fas fa-trash-alt" onClick={()=>handleRemoveFromCart(index)} />
          </div>
        ))}
      </div>
  {this.state.cart.length > 0 && (
        <div className="Checkout-sidebar">
          <h3>Precio Total:</h3>
          <h4 />
        </div>
      )
      
      }
      
</div>
            <div className="menuFacturacion">
     

      
      
      
      <Link to="#">
        <div className="menuFacturacion-BotonFacturar" onClick={this.sendData}>
        <div className='icono'><i className="fas fa-money-check-alt" /></div>
        <div className='option'>FACTURAR</div>
      </div>
      </Link>
      
      
    </div>


            {/* <div className={this.state.isMenuOpen? "menuOpen" : "menuClosed"}>
              <div className='menuButton' onClick={this.toggleMenu}>
                <div className='icono'><i className={!this.state.isMenuOpen ? "fas fa-bars" : "far fa-window-close"} /></div>
                <div className='option' />
              </div>
              <Link to="/">
                <div className={this.state.classRow}>
                  <div className='icono'><i className="fas fa-cash-register"></i></div>
                  <div className='option'> Facturacion</div>
                </div>
              </Link>
              <Link to="ListadoFacturas">
                <div className={this.state.classRow}>
                  <div className='icono'><i className="fas fa-file-invoice"></i></div>
                  <div className='option'> Listado Facturas</div>
                </div>
              </Link>
              <Link to="#">
                <div className={this.state.classRow}>
                  <div className='icono'> <i className="fas fa-warehouse"></i></div>
                  <div className='option'>Inventario</div>
                </div>
              </Link>
              <Link to="#">
                <div className={this.state.classRow}>
                  <div className='icono'><i className="fas fa-chart-line"></i></div>
                  <div className='option'>Reporte de Ventas</div>
                </div>
              </Link>
              <Link to="#">
                <div className={this.state.classRow} onClick={()=>this.toPrintInvoice(this.state.cart)}>
                  <div className='icono'><i className="fas fa-money-check-alt"></i></div>
                  <div className='option'>Cierre de Caja</div>
                </div>
              </Link>
            </div> */}
          </div>
           
        )
        
    }
}

const mapStateToProps = state=>{
  return {
    products: state.products,
    cart:state.cart
  };
}

const mapDispatchToProps={

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)