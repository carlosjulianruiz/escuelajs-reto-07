import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, calcularTotal, resetCart, addPayment } from '../actions'
import axios from 'axios'
import '../styles/components/Checkout.styl';
import Iconos from '../images/iconos';

const Checkout = (props) => {
  const { cart, total, payment} = props;
  const printerIP='192.168.0.2'
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  const handleRemoveFromCart=(index)=>{
       
       props.removeFromCart(index);
  }
  const handlePayment=()=>{
    let payment=event.target.value;
    props.addPayment(payment);
    
  }
  const handleResetCart=()=>{
      props.resetCart();
  }

  const calcularTotal=()=>{
    var total=0;
    cart.map(item=>(
      total+=item.price
    ))
    return total;
  }

  var totalCal=calcularTotal();
  
  const toCheckPrinter=()=>{
    console.log("revisando conneccion")
    const ePosDev = new epson.ePOSDevice();
    function connect() {
      console.log("conectando")
        const ipAddress = '192.168.0.2';
        console.log("conecting to 192.168.0.2");
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
            console.log("No hay coneccion con la impresora")
            
        }
    }

  connect()
  }
  
  toCheckPrinter();
  
  const toPrintInvoice=(data,fecha,id)=>{
    const ePosDev = new epson.ePOSDevice();
    function connect() {
        const ipAddress = '192.168.0.2';
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
        if(id>600){
          printer.addText("Resolucion Dian 18763001601902 del 09-11-2019\n");
          printer.addText("Del numero del 601 al 3000 vigencia 24 meses\n");
        }else{
          printer.addText("Resolucion Dian 18763001160908 del 20-10-2019\n");
          printer.addText("Del numero del 401 al 600 vigencia 24 meses\n");
        }
        
        printer.addFeedLine(5);
        printer.addCut(printer.CUT_FEED);
        printer.addFeedLine(3);
        printer.addText("Comanda para el barista\n");
        data.map((item,index)=>{
        printer.addText(`${item.title} \n`);
         
         })
          printer.addCut(printer.CUT_FEED);
          printer.addFeedLine(5);

        
    } 

    function send() {
        if (ePosDev.isConnected) {
            printer.send();
        }
    }
     connect();
    }
    
  const sendData=()=>{
    const dataToSend ={
      cart,
      payment,
      claveAcceso:"Banexport_59623"
    }
    
    fetch('/POS/api/crearPost.php',{
      method:'post',
      body:JSON.stringify(dataToSend)
    }).then(function(response){
      response.json()
      .then(function(data){
        console.log("data:");
        console.log(data);
        toPrintInvoice(cart,data.fecha,data.id);
        
        handleResetCart();
      });

      
    })

    // fetch('http://206.189.170.11/api/crearPost.php',{
    //   method:'post',
    //   body:JSON.stringify(dataToSend)
    // }).then(function(response){
    //   console.log(response.json())
    // })


    // 2da Opcion: Enviando datos en el body y utilizando en el servidor php://input
    // ver notas POST FROM NODE JAVASCRIPT TO PHP

    // if(cart.length>0){
    //   const options = {
    //     headers: {'X-Custom-Header': 'application/x-www-form-urlencoded'}
    //   };

    //   axios.post('https://www.bancaexportadora.com.co/POS/data.php',JSON.stringify(cart),options)
    //   .then(
    //     (response)=>{
    //       console.log(response);
    //     }
    //   ).catch(function(error){
    //     console.log(error);
    //   })


      // 3ra Opcion, enviando datos para el GET
    // axios.post(`https://www.bancaexportadora.com.co/api/crear.php?clave=banexport_59623&datos=${JSON.stringify(cart)}&payment=${payment}`)
    // .then(res=>{
    //   console.log(res);
    //   console.log(res.data);
      
    //   console.log(res.data.fecha);
    //   console.log(res.data.id);
      
      
      // toPrintInvoice(cart,res.data.fecha,res.data.id);
      // handleResetCart();


    // })


    // }
    } 

  const handleChange=()=>{
    let display=document.getElementsByClassName("cambio")[0];
    let pago=event.target.value;
    console.log(`pago ${pago}`);
    if(pago==null){
        display.innerHTML="";
    }
    let valorFactura=calcularTotal();
    if(valorFactura>0){
      let cambio=pago-valorFactura;
      if (cambio>0){
        
        display.innerHTML=formatter.format(cambio);
      } else{
        display.innerHTML="";
      }
    }
  }
  return (

    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Lista de Pedidos:</h3> : <h2>Sin Pedidos</h2>}
        {cart.map((item,index) => (
          <div className="Checkout-item" key={index}>
            <div className="Checkout-element">
              <h4>{item.title}</h4>
              <span>
                {formatter.format(item.price)}
              </span>
            </div>
            <img src="https://cdnbanexport.sfo2.digitaloceanspaces.com/FotosPOS/ui/trash-alt-solid.svg" alt="Delete" className="trash" onClick={()=>handleRemoveFromCart(index)}/>
          </div>
        ))}
        <div className="MenuCheckout-formaPago">
          <button className="MenuCheckout-formaPago_efectivo" value="Efectivo" onClick={handlePayment} >Efectivo</button>
          <div className="cal">
            <div><input type="text" onKeyUp={handleChange} className="MenuCheckout-formaPago_pago" placeholder="MONTO RECIBIDO" /></div>
            <div className="cambio">></div>
          </div>
          <button className="MenuCheckout-formaPago_tarjeta" value="Tarjeta" onClick={handlePayment}>Tarjeta</button>
        </div>
        <div className="MenuCheckout" onClick={sendData}>
            <div className="MenuCheckout-printInvoice">
            <img src="https://cdnbanexport.sfo2.digitaloceanspaces.com/FotosPOS/ui/print-solid.svg" alt="Print"/>
            </div>
        </div>
        
      </div>
      {cart.length > 0 && (
        <div className="Checkout-sidebar">
          <h3>Precio Total:</h3>
          <h4>{formatter.format(totalCal)}</h4>
        </div>
      )}
    </div>

  )
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    total:state.total,
    payment:state.payment
  };
};

const mapDispatchToProps={
  removeFromCart,
  calcularTotal,
  resetCart,
  addPayment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);