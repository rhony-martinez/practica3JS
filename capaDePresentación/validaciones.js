function convertirAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

  return horas * 60 + minutos;
}

function validarHoras(inicio, fin, errorElement, mensaje) {
    const inicioMinutos = convertirAMinutos(inicio.value) 
    const finMinutos = convertirAMinutos(fin.value)
    if (inicioMinutos >= finMinutos) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement,mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@unicauca\.edu\.co$/;
    if (!correoRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,            // Duración: 3 segundos
        gravity: "top",             // Posición: arriba
        position: "right",          // Alineación: derecha
        style: {
            background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
            color: "#fff",                      // Texto blanco
            borderRadius: "12px",               // Esquinas redondeadas
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
            padding: "12px 20px"               // Más relleno
        },
        stopOnFocus: true, // No desaparecer al pasar el mouse
    }).showToast();
}

// Función principal que valida todo el formulario
function validarFormularioMedico() {

    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputInicioAtencion = document.getElementById('inicioAtencion');
    const inputFinAtencion = document.getElementById('finAtencion');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');
    const inputBiografiaMedico = document.getElementById('biografiaMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorHorarioMedico=document.getElementById('errorHorarioMedico')
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');
    const labelErrorBiografiaMedico=document.getElementById('errorBiografiaMedico');

    const nombresMedicoValidos=validarCampoObligatorio(inputNombresMedico,labelErrorNombresMedico,"El campo nombres es obligatorio");
    const apellidosMedicoValidos = validarCampoObligatorio(inputApellidosMedico,labelErrorApellidosMedico, "Los apellidos son obligatorios");
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const especialidadValida = validarLongitud(inputEspecialidadMedico,labelErrorEspecialidadMedico , 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres');
    const atencionValida = validarHoras(inputInicioAtencion, inputFinAtencion, labelErrorHorarioMedico, 'La hora fin debe ser mayor a la de inicio');
    //const aniosExpValidos = validarLongitud(inputAniosExpMedico,labelErrorAniosExpMedico , 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
    const biografiaValida = validarLongitud(inputBiografiaMedico, labelErrorBiografiaMedico,0, 200, 'La biografía tiene máximo 200 caracteres');

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (nombresMedicoValidos && apellidosMedicoValidos && generoValido && especialidadValida && biografiaValida && atencionValida) {
        mostrarMensajeExito(); 
        const formulario = document.getElementById('formMedico'); 
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposAlCambiarFoco()
{
    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');
    const inputBiografiaMedico = document.getElementById('biografiaMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');
    const labelErrorBiografiaMedico=document.getElementById('errorBiografiaMedico');

    inputNombresMedico.addEventListener('blur',()=> validarCampoObligatorio(
        inputNombresMedico,
        labelErrorNombresMedico,
        "El nombre es obligatorio"));
        
    inputApellidosMedico.addEventListener('blur', () => validarCampoObligatorio(inputApellidosMedico, labelErrorApellidosMedico, 'Los apellidos son obligatorios.'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
    inputEspecialidadMedico.addEventListener('blur', () => validarLongitud(inputEspecialidadMedico, labelErrorEspecialidadMedico, 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres.'));
    //inputAniosExpMedico.addEventListener('blur', () => validarLongitud(inputAniosExpMedico, labelErrorAniosExpMedico, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres.'));
    inputBiografiaMedico.addEventListener('blur', () => validarLongitud(inputBiografiaMedico, labelErrorBiografiaMedico,0, 200, 'La biografía tiene máximo 200 caracteres'));
    
}

document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);