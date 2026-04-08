const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidDateString = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const isFutureDate = (value) => {
  const candidate = new Date(value);
  const today = new Date();

  candidate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return candidate > today;
};

const shouldValidate = (payload, key, isPartial) => !isPartial || payload[key] !== undefined;

const validateEstudianteInput = (payload, options = {}) => {
  const { isPartial = false } = options;
  const errors = {};

  if (shouldValidate(payload, "nombre", isPartial)) {
    if (!payload.nombre || !String(payload.nombre).trim()) {
      errors.nombre = "El campo nombre es requerido.";
    }
  }

  if (shouldValidate(payload, "apellido", isPartial)) {
    if (!payload.apellido || !String(payload.apellido).trim()) {
      errors.apellido = "El campo apellido es requerido.";
    }
  }

  if (shouldValidate(payload, "email", isPartial)) {
    if (!payload.email || !String(payload.email).trim()) {
      errors.email = "El campo email es requerido.";
    } else if (!EMAIL_REGEX.test(String(payload.email).trim())) {
      errors.email = "El email no tiene un formato válido.";
    }
  }

  if (shouldValidate(payload, "carrera_id", isPartial)) {
    if (payload.carrera_id === undefined || payload.carrera_id === null || payload.carrera_id === "") {
      errors.carrera_id = "El campo carrera_id es requerido.";
    } else if (!Number.isInteger(Number(payload.carrera_id)) || Number(payload.carrera_id) <= 0) {
      errors.carrera_id = "El campo carrera_id debe ser un número entero positivo.";
    }
  }

  if (shouldValidate(payload, "fecha_nacimiento", isPartial)) {
    if (payload.fecha_nacimiento) {
      if (!isValidDateString(payload.fecha_nacimiento)) {
        errors.fecha_nacimiento = "La fecha de nacimiento no es válida.";
      } else if (isFutureDate(payload.fecha_nacimiento)) {
        errors.fecha_nacimiento = "La fecha de nacimiento no puede ser mayor a la fecha actual.";
      }
    }
  }

  return errors;
};

const normalizeEstudiantePayload = (payload) => ({
  nombre: payload.nombre !== undefined ? String(payload.nombre).trim() : undefined,
  apellido: payload.apellido !== undefined ? String(payload.apellido).trim() : undefined,
  email: payload.email !== undefined ? String(payload.email).trim().toLowerCase() : undefined,
  fecha_nacimiento: payload.fecha_nacimiento !== undefined ? payload.fecha_nacimiento || null : undefined,
  carrera_id: payload.carrera_id !== undefined ? Number(payload.carrera_id) : undefined,
});

module.exports = {
  validateEstudianteInput,
  normalizeEstudiantePayload,
};
