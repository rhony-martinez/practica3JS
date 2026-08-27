class GestionarMedicos {
  constructor(repoMedico) {
    this.repoMedico = repoMedico;
  }

  registrarMedico(nombre, apellido, especialidad, inicioAtencion, finAtencion, aniosExp, biografia) {
    const id = this.repoMedico.siguienteId();
    const inicioMedicoMinutos = convertirAMinutos(inicioAtencion);
    const finMedicoMinutos = convertirAMinutos(finAtencion);
    if (inicioMedicoMinutos >= finMedicoMinutos) {
      throw new Error("La hora de inicio debe ser mayor a la hora fin")
    }
    const medico = new Medico(id, nombre, apellido, especialidad, inicioAtencion, finAtencion, aniosExp, biografia)
    
    this.repoMedico.agregar(medico);
    return medico;
  }

  listarMedicos() {
    return this.repoMedico.obtenerTodos();
  }

  buscarMedico(id) {
    return this.repoMedico.buscarPorId(id);
  }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);

