import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import '../styles/components/Menu.styl'
import axios from 'axios'
import { removeFromCart, calcularTotal } from '../actions'


class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isMenuOpen: false,
      classRow:"menuRow",
      cart:props.cart,
      factura:[],
      printerIP:'192.168.0.2'   
  }
  }
  
  handleRemoveFromCart=(index)=>{
      
      this.props.removeFromCart(index);
      console.log(this.state.cart);
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

    toCheckPrinter=(state)=>{
      console.log("revisando conneccion")
      const ePosDev = new epson.ePOSDevice();
      function connect() {
        console.log("conectando__")
        console.log(state.printerIP)
          const ipAddress = state.printerIP;
          const port = '8008';
          ePosDev.connect(ipAddress, port, callback_connect);
      }

      function callback_connect(resultConnect) {
        console.log("accediendo a la impresora...");
          const deviceId = 'local_printer';
          const options = { 'crypto': false, 'buffer': false };
          // document.getElementById("resultadoConeccion").innerHTML=resultConnect;
          if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) {
              // Retrieves the Printer object

              console.log("coneccion ok")
              
          }
          else {
              // Displays error messages
              console.log(`No hay coneccion con la impresora`)
              
          }
      }

    connect()
    }

    

    toPrintInvoice=(data,fecha,id)=>{
      const ePosDev = new epson.ePOSDevice();
      function connect() {
          const ipAddress = '192.168.19.96';
          const port = '8008';
          ePosDev.connect(ipAddress, port, callback_connect);
      }

      function callback_connect(resultConnect) {
          const deviceId = 'local_printer';
          const options = { 'crypto': false, 'buffer': false };
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
          createData(data,fecha,id)
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
          
          printer.addTextAlign(printer.ALIGN_CENTER);
          printer.addText("CAFE 18 - TOP 5 COFFEE SHOP SAS \n");
          printer.addText("REGIMEN COMUN\n");
          printer.addText("FACTURA DE VENTA\n");
          printer.addText("CRA 9 70A 35 PISO 5\n");
          printer.addText("7448219 BOGOTA\n");
          printer.addText("NIT 901011846-1\n");
          printer.addTextAlign(printer.ALIGN_LEFT);
          printer.addText(`Numero Factura:\t ${id} \n`);
          printer.addText(`Fecha:\t ${fecha} \n`);
          printer.addFeedLine(2);
                    let base=0;
                    let total=0;
                    let ipoconsumo=0;
                    let baseIpoconsumo=0;
                    let iva=0;
                    let baseIva=0;
                    let iva5=0;
                    let baseIva5=0;
                    printer.addText("PRODUCTO\t\t\t PRECIO\t\t\n");
                    printer.addText("================================================\n");
             data.map((item,index)=>{
               printer.addText(`${item.title.substring(0,25)}\t\t`);
               printer.addTextAlign(printer.ALIGN_RIGHT);
               printer.addText(`$ ${item.price}\n`);
               printer.addTextAlign(printer.ALIGN_LEFT);

               total+=item.price;
               if(item.category==="MENU"){
                 base=item.price/(1+0.08);
                 baseIpoconsumo=base+baseIpoconsumo;
                 ipoconsumo+=base*(0.08);
                 base=0;
               }
               if(item.category==="CAFE"){
                 base=item.price/(1+0.05)
                 baseIva5=baseIva5+base;
                 iva5=base*(0.05)
              }
              if(item.category==="ACCESORIOS"){
                base=item.price/(1+0.19)
                baseIva=baseIva5+base;
                iva=base*(0.19)
              }
              if(item.category==="MERCHANDISING"){
                base=item.price/(1+0.19)
                baseIva=baseIva5+base;
                iva=base*(0.19)
              }
          })
          printer.addText("================================================\n");
          printer.addTextAlign(printer.ALIGN_RIGHT);
          printer.addText(`Imp Consumo :$ ${ipoconsumo.toFixed(0)}\n`);
          printer.addText(`Iva 5% \t: $ ${iva5.toFixed(0)}\n`);
          printer.addText(`Iva 19% \t:$ ${iva.toFixed(0)}\n`);
          printer.addText(`TOTAL \t:$ ${total}\n`);
          printer.addFeedLine(1);
          printer.addTextAlign(printer.ALIGN_CENTER);
          printer.addText("www.cafe18.com.co\n");
          printer.addFeedLine(2);
          printer.addText("Resolucion Dian 18763001160908 del 20-10-2019\n");
          printer.addText("Del numero del 401 al 600 vigencia 24 meses\n");
          printer.addFeedLine(5);
          printer.addCut(printer.CUT_FEED);
          printer.addFeedLine(3);
          printer.addText("Comanda para el barista\n");
          data.map((item,index)=>{
          printer.addText(`${item.title} $ ${item.price}\n`);
           
           })
            printer.addCut(printer.CUT_FEED);
            printer.addFeedLine(3);

          
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
        
        console.log(res.data.fecha);
        console.log(res.data.id);
        
        this.setState({
          factura:res.data
        })  
        this.toPrintInvoice(this.state.cart,res.data.fecha,res.data.id);



      })
      }
      }   

      componentDidMount(){
           this.toCheckPrinter(this.state);

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
            <i className="fas fa-trash-alt" onClick={()=>this.handleRemoveFromCart(index)} />
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
              <div className="resultado Factura">
                { this.state.factura.lenght>0? <p>datos en factura{' '}{this.state.factura.id}</p>:<p>factura sin datos</p>}
              </div>
      
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

const mapStateToProps = (state)=>{
  return {
    products: state.products,
    cart:state.cart
  };
}

const mapDispatchToProps={
  removeFromCart,
  calcularTotal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)