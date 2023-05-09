import React, { Component } from 'react';
import Lista from './Lista';
import Detalhe from './Detalhe';
import Criar from './Criar';


class Weather extends Component {
  state = { listaWeather: [], dadosWeather: null, pageHandler: 0 }

  async componentDidMount() {
    this.buscarDadosIniciais();
  }

  async buscarDadosIniciais() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://localhost:7261/weatherforecast", requestOptions)
      .then(res => res.json())
      .then(result => this.setState({ listaWeather: result }))
      .catch(error => console.log('error', error));
  }

  buscarDetalhes(id) {
    fetch("https://localhost:7261/weatherforecast/" + id)
      .then(res => res.json())
      .then(result => this.setState({ dadosWeather: result, pageHandler: 1}))
      .catch(error => console.log('error', error));
  }

  async criarPrevisao(date, temperature, summary) {
    let obj;
    console.log(temperature);
    if (date === undefined || date === null) {
      obj = {Date: new Date().toJSON(), TemperatureC:20, Summary: "Descrição genérica"};
    } else {
      obj = {Date: date.toJSON(), TemperatureC:temperature, Summary: summary};
    }

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
    };

    fetch("https://localhost:7261/weatherforecast/create", requestOptions)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    this.setState({pageHandler: 0});
    this.buscarDadosIniciais();
  }
  
  changeHandler(numpagina){
    this.setState({pageHandler: numpagina});
  }



  render() {
    // listar dias
    if (this.state.pageHandler === 0) {
      return (
        <Lista lista={this.state.listaWeather}
        changeHandler={() => {this.changeHandler(2)}}  
          buscarDetalhes={(id) => { this.buscarDetalhes(id)} }
        />
      );
    // listar menu detalhes
    } else if (this.state.pageHandler === 1) {
      return <Detalhe dadosPrevisao={this.state.dadosWeather} changeHandler={(id) => {this.changeHandler(id)}} />;
    // menu criacao
    } else if (this.state.pageHandler === 2) {
      return <Criar criarPrevisao={(date, temperature, summary) => {this.criarPrevisao(date, temperature, summary)}} changeHandler={(id) => {this.changeHandler(id)}}/>;
    } 


  }
}

export default Weather;