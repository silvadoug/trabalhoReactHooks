import React from 'react';

import './botao.css';

interface BotaoProps {
  visibility: boolean,
  value: string,
  func: Function,
  cor: string,
}

function Botao(props: BotaoProps) {
  return (
    <button 
      disabled={props.visibility} 
      onClick={() => props.func()}
      className={`btn btn-${props.cor}`}>
      {props.value}
    </button>
  );
}

export default Botao;
