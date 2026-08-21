class Medico {
  constructor(id, nombres, apellidos, especialidad, inicioAtencion, finAtencion, aniosExp, biografia) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.especialidad = especialidad;
    this.horarioAtencion = {
      inicio: inicioAtencion,
      fin: finAtencion
    }
    this.aniosExp = aniosExp;
    this.biografia = biografia;
  }
}



