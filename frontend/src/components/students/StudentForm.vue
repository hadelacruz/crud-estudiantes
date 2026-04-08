<template>
  <section class="student-form">
    <h2>{{ isEditing ? "Editar estudiante" : "Nuevo estudiante" }}</h2>

    <form @submit.prevent="onSubmit">
      <div class="grid">
        <div class="field">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model.trim="form.nombre"
            type="text"
            placeholder="Nombre"
          />
          <small v-if="errors.nombre" class="error">{{ errors.nombre }}</small>
        </div>

        <div class="field">
          <label for="apellido">Apellido</label>
          <input
            id="apellido"
            v-model.trim="form.apellido"
            type="text"
            placeholder="Apellido"
          />
          <small v-if="errors.apellido" class="error">{{
            errors.apellido
          }}</small>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="correo@ejemplo.com"
          />
          <small v-if="errors.email" class="error">{{ errors.email }}</small>
        </div>

        <div class="field">
          <label for="fecha_nacimiento">Fecha de nacimiento</label>
          <input
            id="fecha_nacimiento"
            v-model="form.fecha_nacimiento"
            type="date"
          />
        </div>

        <MajorSelect v-model="form.carrera_id" :majors="majors" />
        <small v-if="errors.carrera_id" class="error">{{
          errors.carrera_id
        }}</small>
      </div>

      <div class="actions">
        <button type="submit">
          {{ isEditing ? "Guardar cambios" : "Crear estudiante" }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          class="secondary"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import MajorSelect from "../majors/MajorSelect.vue";

const emptyForm = () => ({
  nombre: "",
  apellido: "",
  email: "",
  fecha_nacimiento: "",
  carrera_id: 0,
});

export default {
  name: "StudentForm",
  components: {
    MajorSelect,
  },
  props: {
    student: {
      type: Object,
      default: null,
    },
    majors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: emptyForm(),
      errors: {},
    };
  },
  computed: {
    isEditing() {
      return Boolean(this.student && this.student.id);
    },
  },
  watch: {
    student: {
      handler(next) {
        if (!next) {
          this.form = emptyForm();
          this.errors = {};
          return;
        }

        this.form = {
          nombre: next.nombre || "",
          apellido: next.apellido || "",
          email: next.email || "",
          fecha_nacimiento: next.fecha_nacimiento || "",
          carrera_id: next.carrera_id || 0,
        };
        this.errors = {};
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    validate() {
      const errors = {};

      if (!this.form.nombre) errors.nombre = "Nombre requerido.";
      if (!this.form.apellido) errors.apellido = "Apellido requerido.";
      if (!this.form.email) errors.email = "Email requerido.";
      if (!this.form.carrera_id) errors.carrera_id = "Carrera requerida.";

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    onSubmit() {
      if (!this.validate()) return;

      this.$emit("submit", {
        ...this.form,
        fecha_nacimiento: this.form.fecha_nacimiento || null,
      });
    },
  },
};
</script>

<style scoped>
.student-form {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
}

h2 {
  margin: 0 0 12px;
}

.grid {
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  background: #0f766e;
  color: #fff;
}

button.secondary {
  background: #64748b;
}

.error {
  color: #b91c1c;
}
</style>
