import './password-strength-bar.scss';

import React from 'react';

export interface IPasswordStrengthBarProps {
  password: string;
}

export const PasswordStrengthBar = ({ password }: IPasswordStrengthBarProps) => {
  const colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  const measureStrength = (p: string): number => {
    let forca = 0;
    const regex = /[$-/:-?{-~!"^_`[\]]/g;
    const flags = {
      letrasMinusculas: /[a-z]+/.test(p),
      letrasMaiusculas: /[A-Z]+/.test(p),
      numeros: /\d+/.test(p),
      simbolos: regex.test(p),
    };

    const matchesPassados = Object.values(flags).filter((isMatchedFlag: boolean) => !!isMatchedFlag).length;

    forca += 2 * p.length + (p.length >= 10 ? 1 : 0);
    forca += matchesPassados * 10;

    // penalidade (senha curta)
    forca = p.length <= 6 ? Math.min(forca, 10) : forca;

    // penalidade (pouca variedade de caracteres)
    forca = matchesPassados === 1 ? Math.min(forca, 10) : forca;
    forca = matchesPassados === 2 ? Math.min(forca, 20) : forca;
    forca = matchesPassados === 3 ? Math.min(forca, 40) : forca;

    return forca;
  };

  const getColor = (s: number): any => {
    let idx = 0;
    if (s > 10) {
      if (s <= 20) {
        idx = 1;
      } else if (s <= 30) {
        idx = 2;
      } else if (s <= 40) {
        idx = 3;
      } else {
        idx = 4;
      }
    }
    return { idx: idx + 1, col: colors[idx] };
  };

  const getPoints = forca => {
    const pts = [] as any[];
    for (let i = 0; i < 5; i++) {
      pts.push(<li key={i} className="point" style={i < forca.idx ? { backgroundColor: forca.col } : { backgroundColor: '#DDD' }} />);
    }
    return pts;
  };

  const forcaSenha = getColor(measureStrength(password));
  const pontos = getPoints(forcaSenha);

  return (
    <div id="strength">
      <small>Força da senha:</small>
      <ul id="strengthBar">{pontos}</ul>
    </div>
  );
};

export default PasswordStrengthBar;
