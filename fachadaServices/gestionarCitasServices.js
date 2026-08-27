class GestionarCitas {
  constructor(medicoRepo, pacienteRepo, citaRepo) {
    this.medicoRepo = medicoRepo;
    this.pacienteRepo = pacienteRepo;
    this.citaRepo = citaRepo;
  }
  registrarCita(fecha, horaInicio, horaFin, idMedico, idPaciente) {
    const horaInicioMinutos = convertirAMinutos(horaInicio)
    const horaFinMinutos = convertirAMinutos(horaFin);
    
    const id = this.citaRepo.siguienteId();
    const medico = this.medicoRepo.buscarPorId(idMedico);
    const inicioMedicoMinutos = convertirAMinutos(medico.horarioAtencion.inicio);
    const finMedicoMinutos = convertirAMinutos(medico.horarioAtencion.fin);
    if (!medico) {
      throw new Error("Médico no encontrado");
    }
    const paciente = this.pacienteRepo.buscarPorId(idPaciente);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }
    if (horaInicioMinutos < inicioMedicoMinutos || horaInicioMinutos > finMedicoMinutos || horaFinMinutos < inicioMedicoMinutos || horaFinMinutos > finMedicoMinutos ) {
      throw new Error("El médico no tiene atención en este horario")
    }
    if (horaInicioMinutos >= horaFinMinutos) {
      throw new Error("La hora de inicio debe ser mayor a la hora fin")
    }
    const cita = new Cita(id, fecha, horaInicio, horaFin, medico, paciente);
    this.citaRepo.agregar(cita);
    return cita;
  }

  listarCitas() {
    return this.citaRepo.obtenerTodos();
  }

  buscarCita(id) {
    return this.citaRepo.buscarPorId(id);
  }
}

const gestionarCitas = new GestionarCitas(medicoRepo, pacienteRepo, citaRepo);
