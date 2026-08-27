function convertirAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

  return horas * 60 + minutos;
}