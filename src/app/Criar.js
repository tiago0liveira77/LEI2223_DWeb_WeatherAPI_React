import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class Criar extends Component {
    state = {
        startdate: new Date(),
        summary: "",
        temperature: -256,
    };
    constructor(props) {
        super(props);
      }

      test(){
        console.log(this.state.temperature);
      }
    render() {
        return (
            <div class="row">
                <h4>Adicionar Weather</h4>
                
                <div class="col-6">
                <DatePicker selected={this.state.startdate} onChange={(date) => this.setState({ startdate: date})} />
                    <label>Summary </label>
                    <input type="text" onChange={(evt) => this.setState({ summary: evt.target.value})} ></input>
                    <label>Temperatura </label>
                    <input type="number" onChange={(evt) => this.setState({ temperature:  evt.target.value})}></input>
                </div>
                <button onClick={() => this.props.criarPrevisao(this.state.startdate, this.state.temperature, this.state.summary )}>Criar</button>~
                <button onClick={() => this.props.changeHandler(0)}>Voltar</button>
            </div>
        );
    }
}

export default Criar;