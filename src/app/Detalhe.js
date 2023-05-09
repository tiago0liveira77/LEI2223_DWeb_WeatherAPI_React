import React, { Component } from 'react';

class Detalhe extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>{this.props.dadosPrevisao.summary + " " + this.props.dadosPrevisao.temperatureC}
      <button onClick={() => this.props.changeHandler(0)}>Voltar</button>
      </div>
    );
  }
}

export default Detalhe;