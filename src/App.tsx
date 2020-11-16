import React, { useState, useEffect } from 'react';

import './App.css';
import Botao from './components/Botao';

interface Turno {
  jogadorA: boolean;
  ataque: number;
  defesa: number;
  dano: boolean;
  func: React.Dispatch<React.SetStateAction<number>>;
  countDado: number;
  count: number;
}

interface UltimoTurno {
  atacante: string;
  ataque: number;
  defesa: number;
  resultado: string;
}

function App() {
  const [ jogadorA, setJogadorA ] = useState<number>(20);
  const [ jogadorB, setJogadorB ] = useState<number>(20);
  const turnoInicial: Turno = {
    jogadorA: true,
    ataque: 0,
    defesa: 0,
    dano: false,
    func: setJogadorB,
    countDado: 0,
    count: 1,
  };
  const [ turno, setTurno ] = useState<Turno>(turnoInicial);
  const ultimoTurnoInicial: UltimoTurno = {
    atacante: '',
    ataque: 0,
    defesa: 0,
    resultado: '',
  };
  const [ ultimoTurno, setUltimoTurno ] = useState<UltimoTurno>(ultimoTurnoInicial);
  const [ dano, setDano ] = useState<number>(0);
  const [ fim, setFim ] = useState<boolean>(false);
  const [ reset, setReset ] = useState<boolean>(false);

  useEffect(() => {
    if (turno.countDado === 2) {
      if (turno.ataque > turno.defesa){
        setTurno({ ...turno, countDado: 0, dano: true });
      } else {
        fimTurno();
      }
    }
  }, [ turno ]);

  useEffect(() => {
    if (jogadorA <= 0 || jogadorB <= 0) {
      setFim(true);
    }
  }, [ jogadorA, jogadorB ]);

  useEffect(() => {
    if (reset) {
      setJogadorA(20);
      setJogadorB(20);
      setTurno(turnoInicial);
      setUltimoTurno(ultimoTurnoInicial);
      setFim(false);
      setReset(false);
    }
  }, [ reset ]);

  function rolarDado() {
    return Math.floor(Math.random() * 20 + 1);
  }

  function fimTurno(causouDano: boolean = false) {
    const jogadorA = !turno.jogadorA;
    const func = jogadorA ? setJogadorB : setJogadorA;
    const count = turno.count + 1;

    setUltimoTurno({
      atacante: turno.jogadorA ? 'Jogador A' : 'Jogador B',
      ataque: turno.ataque,
      defesa: turno.defesa,
      resultado: causouDano ? 'Atacou com sucesso' : 'Ataque foi defendido',
    });

    setTurno({
      jogadorA,
      ataque: 0,
      defesa: 0,
      dano: false,
      func,
      countDado: 0,
      count,
    });
  }

  function handleDado() {
    const valor = rolarDado();
    const countDado = turno.countDado + 1;

    if (countDado === 1) {
      setTurno({ ...turno, ataque: valor, countDado });
    } else {
      setTurno({ ...turno, defesa: valor, countDado });
    }
  }

  function handleDano() {
    const func = turno.func;
    const dano = rolarDado();

    setDano(dano);
    func((vida) => vida - dano);
    fimTurno(true);
  }

  function handleFim() {
    setReset(true);
  }

  return (
    <div className="container main border text-center">
      <div className="border border-dark">
        <div className="row">
          <div className="col border border-dark">
            <p>Ultimo Round: {ultimoTurno.atacante} - {ultimoTurno.resultado}</p>
          </div>
        </div>
        <div className="row">
          <div className="col border border-dark">
            <p>Ataque: {ultimoTurno.ataque}</p>
          </div>
          <div className="col border border-dark">
            <p>Defesa: {ultimoTurno.defesa}</p>
          </div>
        </div>
      </div>
      <div className="border border-primary">
        <div className="row">
          <div className="col border border-primary">
            <p>Turno: {turno.count}</p>
          </div>
        </div>
        <div className="row">
          <div className={`col border border-${turno.jogadorA ? 'danger' : 'primary'}`}>
            <p>Jogador A: {jogadorA}</p>
          </div>
          <div className={`col border border-${!turno.jogadorA ? 'danger' : 'primary'}`}>
            <p>Jogador B: {jogadorB}</p>
          </div>
        </div>
        <div className="row border">
          <div className="col border border-primary">
            <p>Ataque: {turno.ataque}</p>
          </div>
          <div className="col border border-primary">
            <p>Dano: {dano}</p>
          </div>
          <div className="col border border-primary">
            <p>Defesa: {turno.defesa}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Botao 
            visibility={fim ? fim : turno.dano} 
            func={handleDado} 
            value={'Rolar dado'}
            cor="primary" />
        </div>
        <div className="col">
          <Botao 
            visibility={fim ? fim : !turno.dano} 
            func={handleDano} 
            value={'Ataque'}
            cor="danger" />
        </div>
        <div className="col">
          <Botao 
            visibility={!fim} 
            func={handleFim} 
            value={'Jogar Novamente'}
            cor="info" />
        </div>
      </div>
    </div>
  );
}

export default App;
