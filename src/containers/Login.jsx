import React from 'react'
import '../styles/containers/loggin.styl'



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            code:"",
        }
    }
   

    writeCode=(num)=>{
        console.log(num);
        var newNum=this.state.code+num;
        this.setState({
            code:newNum
        })
    }

    deleteCode=()=>{
        this.setState({
            code:""
        })
    }

    render() {
        return (
            
          <div className="content">
            <div className="Pad">
              <div className="Pad__Logo">
                <img src="https://img.bestcup.coffee/FotosPOS/LogoCafe18White.png" alt="Logo Cafe 18" />
              </div>
              <div className="Pad__Pass">
                <input type="password" name="code" className="Pad__Pass" value={this.state.code} readOnly/>
              </div>
              <div className="Pad__Numeros">

                <div onClick={()=>this.writeCode(1)}>1</div>
                <div onClick={()=>this.writeCode(2)}>2</div>
                <div onClick={()=>this.writeCode(3)}>3</div>
              </div>
              <div className="Pad__Numeros">
                <div onClick={()=>this.writeCode(4)}>4</div>
                <div onClick={()=>this.writeCode(5)}>5</div>
                <div onClick={()=>this.writeCode(6)}>6</div>
              </div>
              <div className="Pad__Numeros">
                <div onClick={()=>this.writeCode(7)}>7</div>
                <div onClick={()=>this.writeCode(8)}>8</div>
                <div onClick={()=>this.writeCode(9)}>9</div>
              </div>
              <div className="Pad__Numeros">
                <div onClick={this.deleteCode}>C</div>
                <div onClick={()=>this.writeCode(0)}>0</div>
                <div><i className="fas fa-arrow-alt-circle-left"></i></div>
              </div>
              <div className="Pad__Boton">
                <button type="submit">Ingresar</button>
              </div>
            </div>
          </div>
                )
        
    }     
}
            
            
export default Login