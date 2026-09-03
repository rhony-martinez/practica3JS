const textarea = document.getElementById('biografiaMedico');
const contador = document.getElementById('contador');

textarea.addEventListener('input', function () {
    contador.textContent = `${textarea.value.length}/200 caracteres`;
    if (textarea.value.length === 200) {
        contador.style.fontWeight = "bold";
    } else {
        contador.style.fontWeight = "normal";
    }
});

// const hoy = new Date().toISOString().split('T')[0];

// document.getElementById('fecha').min = hoy;

function convertirAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

  return horas * 60 + minutos;
}

function validarHoras(inicio, fin, errorElement, mensaje) {
    const inicioMinutos = convertirAMinutos(inicio.value) 
    const finMinutos = convertirAMinutos(fin.value)
    if (inicioMinutos >= finMinutos) {
        estilizarCampoError(inicio);
        estilizarCampoError(fin);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(inicio)
        quitarEstiloCampoError(fin)
        errorElement.textContent = '';
        return true;
    }
}

function validarFecha(campo, campoHora, campoFinHora, errorElement, mensaje) {
    if (campo.value === '') {
        estilizarCampoError(campo);
        errorElement.textContent = 'La fecha de la cita es obligatoria';
        campoHora.disabled = true;
        campoFinHora.disabled = true;
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(`${campo.value}T00:00:00`);

    if (fechaSeleccionada < hoy) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        campoHora.disabled = true;
        campoFinHora.disabled=true;
        return false;
    } else {
        quitarEstiloCampoError(campo);
        errorElement.textContent = '';
        campoHora.disabled = false;
        campoFinHora.disabled = false;
        return true;
    }
}

function validarAtencionCita(fecha, hora, errorElement, mensaje) {
    
    const fechaHoraCita = new Date(`${fecha.value}T${hora.value}`);

    const ahora = new Date();
    const minimo = new Date(ahora.getTime() + 3 * 60 * 60 * 1000);

    if (fechaHoraCita < minimo) {
        estilizarCampoError(hora);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(hora);
        errorElement.textContent = '';
        return true;
    }
}

function validarCampoObligatorio(campo, errorElement, mensaje) {

    if (campo.value.trim() === '') {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement,mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/;

    if (!correoRegex.test(campo.value)) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    let errorElementParent = errorElement.parentElement;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        estilizarCampoError(errorElementParent);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(errorElementParent)
        errorElement.textContent = '';
        return true;
    }
}

function validarNumericos(campo, errorElement, min, max, mensaje) {
    if (campo.value < min || campo.value > max) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo);
        errorElement.textContent = '';
        return true;
    }
}

function estilizarCampoError(campo) {
    campo.classList.add("campo-error");
}

function quitarEstiloCampoError(campo) {
    campo.classList.remove("campo-error");
}

// function mostrarMensajeExito() {
//     Toastify({
//         text: "✅ ¡Registro exitoso!",
//         duration: 3000,            // Duración: 3 segundos
//         gravity: "top",             // Posición: arriba
//         position: "right",          // Alineación: derecha
//         style: {
//             background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
//             color: "#fff",                      // Texto blanco
//             borderRadius: "12px",               // Esquinas redondeadas
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
//             padding: "12px 20px"               // Más relleno
//         },
//         stopOnFocus: true, // No desaparecer al pasar el mouse
//     }).showToast();
// }

// Función principal que valida todo el formulario de registro de médicos
function validarFormularioMedico() {

    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputInicioAtencion = document.getElementById('inicioAtencion');
    const inputFinAtencion = document.getElementById('finAtencion');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorInicioAtencion=document.getElementById('errorInicioAtencion')
    const labelErrorFinAtencion=document.getElementById('errorFinAtencion')
    const labelErrorHorarioMedico=document.getElementById('errorHorarioMedico')
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');

    const nombresMedicoValidos=validarCampoObligatorio(inputNombresMedico,labelErrorNombresMedico,"El campo nombres es obligatorio");
    const apellidosMedicoValidos = validarCampoObligatorio(inputApellidosMedico,labelErrorApellidosMedico, "Los apellidos son obligatorios");
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const especialidadValida = validarCampoObligatorio(inputEspecialidadMedico,labelErrorEspecialidadMedico,"La especialidad es obligatoria") && validarLongitud(inputEspecialidadMedico,labelErrorEspecialidadMedico , 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres');
    const inicioAtencionValida = validarCampoObligatorio(inputInicioAtencion,labelErrorInicioAtencion,"La hora de inicio de atención es obligatoria");
    const finAtencionValida = validarCampoObligatorio(inputFinAtencion,labelErrorFinAtencion,"La hora de fin de atención es obligatoria");
    const atencionValida = inicioAtencionValida && finAtencionValida && validarHoras(inputInicioAtencion, inputFinAtencion, labelErrorHorarioMedico, 'La hora fin debe ser mayor a la de inicio');
    const aniosExpValidos = validarCampoObligatorio(inputAniosExpMedico,labelErrorAniosExpMedico,'Los años de experiencia son obligatorios') && validarNumericos(inputAniosExpMedico,labelErrorAniosExpMedico,0,100,"Valor no válido para años de experiencia");

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (nombresMedicoValidos && apellidosMedicoValidos && generoValido && especialidadValida && inicioAtencionValida && finAtencionValida && atencionValida && aniosExpValidos) {
        // mostrarMensajeExito(); 
        // const formulario = document.getElementById('formMedico'); 
        // formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        // setTimeout(() => {
        //     formulario.reset();
        // }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposMedicoAlCambiarFoco() {
    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputInicioAtencion = document.getElementById('inicioAtencion');
    const inputFinAtencion = document.getElementById('finAtencion');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorInicioAtencion=document.getElementById('errorInicioAtencion')
    const labelErrorFinAtencion=document.getElementById('errorFinAtencion')
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');

    inputNombresMedico.addEventListener('blur',()=> validarCampoObligatorio(
        inputNombresMedico,
        labelErrorNombresMedico,
        "El nombre es obligatorio"));
        
    inputApellidosMedico.addEventListener('blur', () => validarCampoObligatorio(inputApellidosMedico, labelErrorApellidosMedico, 'Los apellidos son obligatorios.'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
    inputEspecialidadMedico.addEventListener('blur', () => validarCampoObligatorio(inputEspecialidadMedico,labelErrorEspecialidadMedico,"La especialidad es obligatoria") && validarLongitud(inputEspecialidadMedico, labelErrorEspecialidadMedico, 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres.'));
    inputInicioAtencion.addEventListener('blur', () => validarCampoObligatorio(inputInicioAtencion,labelErrorInicioAtencion,"La hora de inicio de atención es obligatoria"));
    inputFinAtencion.addEventListener('blur', () => validarCampoObligatorio(inputFinAtencion,labelErrorFinAtencion,"La hora de fin de atención es obligatoria"));
    inputAniosExpMedico.addEventListener('blur', () => validarCampoObligatorio(inputAniosExpMedico,labelErrorAniosExpMedico,'Los años de experiencia son obligatorios') && validarLongitud(inputAniosExpMedico, labelErrorAniosExpMedico, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres.') && validarNumericos(inputAniosExpMedico,labelErrorAniosExpMedico,0,100,"Valor no válido para años de experiencia"));
    
}

document.addEventListener('DOMContentLoaded', validarCamposMedicoAlCambiarFoco);

// Función principal que valida todo el formulario de registro de pacientes
function validarFormularioPaciente() {

    const inputNombresPaciente = document.getElementById('nombresPaciente');
    const inputApellidosPaciente = document.getElementById('apellidosPaciente');
    const inputGenero = document.getElementsByName('generoPaciente');
    const inputEdadPaciente = document.getElementById('edadPaciente');
    const inputEmailPaciente = document.getElementById('emailPaciente');

    const labelErrorNombresPaciente=document.getElementById('errorNombresPaciente');
    const labelErrorApellidosPaciente=document.getElementById('errorApellidosPaciente');
    const labelErrorGenero=document.getElementById('errorGeneroPaciente');
    const labelErrorEdadPaciente=document.getElementById('errorEdadPaciente');
    const labelErrorEmailPaciente=document.getElementById('errorEmailPaciente');

    const nombresPacienteValidos=validarCampoObligatorio(inputNombresPaciente,labelErrorNombresPaciente,"El campo nombres es obligatorio");
    const apellidosPacienteValidos = validarCampoObligatorio(inputApellidosPaciente,labelErrorApellidosPaciente, "Los apellidos son obligatorios");
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const edadValida = validarCampoObligatorio(inputEdadPaciente,labelErrorEdadPaciente,'La edad es obligatoria') && validarNumericos(inputEdadPaciente,labelErrorEdadPaciente,0,200,"Valor no válido para la edad");
    const emailValido = validarCampoObligatorio(inputEmailPaciente,labelErrorEmailPaciente, "El correo electrónico es obligatorio") && validarCorreo(inputEmailPaciente,labelErrorEmailPaciente,"El correo no cumple con el formato esperado");
    

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (nombresPacienteValidos && apellidosPacienteValidos && generoValido && edadValida && emailValido) {
        // mostrarMensajeExito(); 
        // const formulario = document.getElementById('formMedico'); 
        // formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        // setTimeout(() => {
        //     formulario.reset();
        // }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposPacienteAlCambiarFoco() {
    const inputNombresPaciente = document.getElementById('nombresPaciente');
    const inputApellidosPaciente = document.getElementById('apellidosPaciente');
    const inputGenero = document.getElementsByName('generoPaciente');
    const inputEdadPaciente = document.getElementById('edadPaciente');
    const inputEmailPaciente = document.getElementById('emailPaciente');

    const labelErrorNombresPaciente=document.getElementById('errorNombresPaciente');
    const labelErrorApellidosPaciente=document.getElementById('errorApellidosPaciente');
    const labelErrorGenero=document.getElementById('errorGeneroPaciente');
    const labelErrorEdadPaciente=document.getElementById('errorEdadPaciente');
    const labelErrorEmailPaciente=document.getElementById('errorEmailPaciente');

    inputNombresPaciente.addEventListener('blur',()=> validarCampoObligatorio(
        inputNombresPaciente,
        labelErrorNombresPaciente,
        "El nombre es obligatorio"));
        
    inputApellidosPaciente.addEventListener('blur', () => validarCampoObligatorio(inputApellidosPaciente, labelErrorApellidosPaciente, 'Los apellidos son obligatorios.'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
    inputEdadPaciente.addEventListener('blur', () => validarCampoObligatorio(inputEdadPaciente,labelErrorEdadPaciente,'La edad es obligatoria') && validarNumericos(inputEdadPaciente,labelErrorEdadPaciente,0,200,"Valor no válido para la edad"));
    inputEmailPaciente.addEventListener('blur', () => validarCampoObligatorio(inputEmailPaciente,labelErrorEmailPaciente, "El correo electrónico es obligatorio") && validarCorreo(inputEmailPaciente,labelErrorEmailPaciente,"El correo no cumple con el formato esperado"));    
    
}

document.addEventListener('DOMContentLoaded', validarCamposPacienteAlCambiarFoco);


// Función principal que valida todo el formulario de registro de citas
function validarFormularioCita() {

    const inputFechaCita = document.getElementById('fecha');
    const inputHoraInicioCita = document.getElementById('horaInicio');
    const inputHoraFinCita = document.getElementById('horaFin');
    const inputMedicoCita = document.getElementById('medicoSelect');
    const inputPacienteCita = document.getElementById('pacienteSelect');

    const labelErrorFechaCita=document.getElementById('errorFechaCita');
    const labelErrorHoraInicioCita=document.getElementById('errorHoraInicioCita');
    const labelErrorHoraFinCita=document.getElementById('errorHoraFinCita');
    const labelErrorMedicoCita=document.getElementById('errorMedicoCita');
    const labelErrorPacienteCita=document.getElementById('errorPacienteCita');

    const fechaValida = validarFecha(inputFechaCita,inputHoraInicioCita,inputHoraFinCita,labelErrorFechaCita,"La cita no puede ser anterior a hoy");
    const horaValida = validarCampoObligatorio(inputHoraInicioCita,labelErrorHoraInicioCita,'La hora de la cita es obligatoria');
    const atencionCitaValida = fechaValida && horaValida && validarAtencionCita(inputFechaCita,inputHoraInicioCita,labelErrorHoraInicioCita,'La cita debe programarse con al menos 3 horas de anticipación');
    const horaFinValida = validarCampoObligatorio(inputHoraFinCita,labelErrorHoraFinCita,'La hora de la cita es obligatoria');
    const horasValidas = horaValida && horaFinValida && validarHoras(inputHoraInicioCita,inputHoraFinCita,labelErrorHoraFinCita,"La hora de fin de la cita debe ser mayor a la de inicio");
    const medicoValido = validarCampoObligatorio(inputMedicoCita,labelErrorMedicoCita,"El médico es obligatorio");
    const pacienteValido = validarCampoObligatorio(inputPacienteCita,labelErrorPacienteCita,"El paciente es obligatorio");

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (fechaValida && atencionCitaValida && horasValidas && medicoValido && pacienteValido) {
        // mostrarMensajeExito(); 
        // const formulario = document.getElementById('formMedico'); 
        // formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        // setTimeout(() => {
        //     formulario.reset();
        // }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposCitaAlCambiarFoco() {
    const inputFechaCita = document.getElementById('fecha');
    const inputHoraInicioCita = document.getElementById('horaInicio');
    const inputHoraFinCita = document.getElementById('horaFin');
    const inputMedicoCita = document.getElementById('medicoSelect');
    const inputPacienteCita = document.getElementById('pacienteSelect');

    const labelErrorFechaCita=document.getElementById('errorFechaCita');
    const labelErrorHoraInicioCita=document.getElementById('errorHoraInicioCita');
    const labelErrorHoraFinCita=document.getElementById('errorHoraFinCita');
    const labelErrorMedicoCita=document.getElementById('errorMedicoCita');
    const labelErrorPacienteCita=document.getElementById('errorPacienteCita');

    inputFechaCita.addEventListener('blur',()=> validarCampoObligatorio(inputFechaCita,labelErrorFechaCita,"La fecha es obligatoria"));
    inputFechaCita.addEventListener('change',()=> validarFecha(inputFechaCita,inputHoraInicioCita,inputHoraFinCita,labelErrorFechaCita,"La cita no puede ser anterior a hoy"));
    inputHoraInicioCita.addEventListener('blur', () => validarCampoObligatorio(inputHoraInicioCita, labelErrorHoraInicioCita, 'La hora de la cita es obligatoria.') && validarAtencionCita(inputFechaCita,inputHoraInicioCita,labelErrorHoraInicioCita,'La cita debe programarse con al menos 3 horas de anticipación'));
    inputHoraFinCita.addEventListener('blur', () => validarCampoObligatorio(inputHoraFinCita, labelErrorHoraFinCita, 'La hora final de la cita es obligatoria.'));
    inputMedicoCita.addEventListener('blur', () => validarCampoObligatorio(inputMedicoCita,labelErrorMedicoCita,"El médico es obligatorio"));
    inputPacienteCita.addEventListener('blur', () => validarCampoObligatorio(inputPacienteCita,labelErrorPacienteCita,"El paciente es obligatorio"));
    
}

document.addEventListener('DOMContentLoaded', validarCamposCitaAlCambiarFoco);