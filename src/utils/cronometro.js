const atualizarCronometro = (dataRecebida, updateTempoFormatado) => {
    const data = new Date(dataRecebida);
  
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const diferencaEmMilissegundos = dataAtual - data;
  
      const segundos = Math.floor(diferencaEmMilissegundos / 1000);
      const minutos = Math.floor(segundos / 60);
      const horas = Math.floor(minutos / 60);
      const dias = Math.floor(horas / 24);
      
      let tempoFormatado = ""

      if (horas < 1) {
        tempoFormatado = `${minutos % 60}m : ${segundos % 60}s`;
      } else if (dias < 1) {
        tempoFormatado = `${horas % 24}h : ${minutos % 60}m : ${segundos % 60}s`;
      } else {
        tempoFormatado = `${dias} D ${horas % 24}h : ${minutos % 60}m : ${segundos % 60}s`;
      }
      //const tempoFormatado = `${dias} D ${horas % 24}h : ${minutos % 60}m : ${segundos % 60}s`;
      console.log(tempoFormatado)
      updateTempoFormatado(tempoFormatado);
    }, 1000);
  
    return intervalId;
  };

export default atualizarCronometro