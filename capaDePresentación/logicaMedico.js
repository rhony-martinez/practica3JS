const formMedico = document.getElementById("formMedico");
const medicoSelect = document.getElementById("medicoSelect");
const btnAgregarMedico = document.getElementById("btnAgregarMedico");

// habilita/deshabilita el botón según la validez del formulario
// formMedico.addEventListener("input", () => {
//   btnAgregarMedico.disabled = !formMedico.checkValidity();
// });

formMedico.addEventListener("submit", (e) => {
  e.preventDefault();  

  if (!validarFormularioMedico()) {
    return;
  }

  const nombres = document.getElementById("nombresMedico").value;
  const apellidos = document.getElementById("apellidosMedico").value;
  const genero = document.querySelector('input[name="generoMedico"]:checked').value;
  const especialidad = document.getElementById("especialidadMedico").value;
  const inicioAtencion = document.getElementById("inicioAtencion").value;
  const finAtencion = document.getElementById("finAtencion").value;
  const aniosExpMedico = document.getElementById("aniosExpMedico").value;
  const biografiaMedico = document.getElementById("biografiaMedico").value;

  try {
    
    const medico = gestionarMedicos.registrarMedico(nombres, apellidos, genero, especialidad, inicioAtencion, finAtencion, aniosExpMedico, biografiaMedico);
    console.log("Médico registrado:", medico);
    // actualizar select
    const option = document.createElement("option");
    option.value = medico.id;
    option.textContent = `${medico.nombres} ${medico.apellidos}`;
    medicoSelect.appendChild(option);
    
    contador.textContent = `0/200 caracteres`;
    contador.style.fontWeight = "normal";
    formMedico.reset();
    //btnAgregarMedico.disabled = true;
    
    mostrarNotificacion(`Médico ${medico.nombres} ${medico.apellidos} registrado con éxito`);
  } catch (error) {
    mostrarNotificacion(error.message, "error")
  }
});

