const formCitas = document.getElementById("formCitas");
const tablaCitas = document.getElementById("tablaCitas");
const btnAgregarCita = document.getElementById("btnAgregarCita");

// habilita/deshabilita el botón según la validez del formulario
// ("change" cubre los <select>, que no siempre disparan "input")
formCitas.addEventListener("input", () => {
  btnAgregarCita.disabled = !formCitas.checkValidity();
});
formCitas.addEventListener("change", () => {
  btnAgregarCita.disabled = !formCitas.checkValidity();
});

formCitas.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const fecha = document.getElementById("fecha").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFin = document.getElementById("horaFin").value;

  const medicoSelect=document.getElementById("medicoSelect");
  const pacienteSelect=document.getElementById("pacienteSelect");

  const xxx = parseInt(medicoSelect.value); 
  const pacienteId = parseInt(pacienteSelect.value); 

  console.log("Datos para registrar cita:", { fecha, horaInicio, horaFin, xxx, pacienteId });
  
  try {
    const cita = gestionarCitas.registrarCita(fecha, horaInicio, horaFin, xxx, pacienteId);
    console.log("Cita registrada:", cita);
    // mostrar en tabla
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.fecha}</td>
      <td>${cita.horaInicio}</td>
      <td>${cita.horaFin}</td>
      <td>${cita.xxx.xxx} ${cita.xxx.xxx}</td>
      <td>${cita.paciente.nombres} ${cita.paciente.apellidos}</td>
    `;
    tablaCitas.appendChild(fila);

    formCitas.reset();
    btnAgregarCita.disabled = true;

    mostrarNotificacion("Cita registrada con éxito");
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
});


