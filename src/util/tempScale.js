// <!-- ========================================= -->
// <!----------tempScale.js — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

// Escala fixa usada em toda a interface para posicionar o medidor de
// temperatura atual e as barras de amplitude da previsão. Manter uma
// escala única faz com que os elementos visuais sejam comparáveis entre
// si (hoje x próximos dias), em vez de puramente decorativos.
const SCALE_MIN = -10
const SCALE_MAX = 40

export function tempToPercent(value) {
  const clamped = Math.min(SCALE_MAX, Math.max(SCALE_MIN, value))
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

export const TEMP_SCALE = { min: SCALE_MIN, max: SCALE_MAX }
