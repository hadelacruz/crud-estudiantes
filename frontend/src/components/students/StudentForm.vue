<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold text-slate-800">
      {{ isEditing ? "Editar estudiante" : "Nuevo estudiante" }}
    </h2>

    <form @submit.prevent="onSubmit">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="grid gap-1.5">
          <label for="nombre" class="text-sm font-medium text-slate-700"
            >Nombre</label
          >
          <input
            id="nombre"
            v-model.trim="form.nombre"
            type="text"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            placeholder="Nombre"
          />
          <small v-if="errors.nombre" class="text-xs text-rose-600">{{
            errors.nombre
          }}</small>
        </div>

        <div class="grid gap-1.5">
          <label for="apellido" class="text-sm font-medium text-slate-700"
            >Apellido</label
          >
          <input
            id="apellido"
            v-model.trim="form.apellido"
            type="text"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            placeholder="Apellido"
          />
          <small v-if="errors.apellido" class="text-xs text-rose-600">{{
            errors.apellido
          }}</small>
        </div>

        <div class="grid gap-1.5">
          <label for="email" class="text-sm font-medium text-slate-700"
            >Email</label
          >
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            placeholder="correo@ejemplo.com"
          />
          <small v-if="errors.email" class="text-xs text-rose-600">{{
            errors.email
          }}</small>
        </div>

        <div class="grid gap-1.5">
          <label
            for="fecha_nacimiento"
            class="text-sm font-medium text-slate-700"
          >
            Fecha de nacimiento
          </label>
          <input
            id="fecha_nacimiento"
            v-model="form.fecha_nacimiento"
            type="date"
            :max="todayDate"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
          <small v-if="errors.fecha_nacimiento" class="text-xs text-rose-600">
            {{ errors.fecha_nacimiento }}
          </small>
        </div>

        <div class="grid gap-1.5">
          <MajorSelect v-model="form.carrera_id" :majors="majors" />
          <small v-if="errors.carrera_id" class="text-xs text-rose-600">
            {{ errors.carrera_id }}
          </small>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <button
          type="submit"
          class="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-800"
        >
          {{ isEditing ? "Guardar cambios" : "Crear estudiante" }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          class="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
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
    resetToken: {
      type: Number,
      default: 0,
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
    todayDate() {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${today.getFullYear()}-${month}-${day}`;
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
    resetToken() {
      this.form = emptyForm();
      this.errors = {};
    },
  },
  methods: {
    isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
    },
    validate() {
      const errors = {};

      if (!this.form.nombre) errors.nombre = "Nombre requerido.";
      if (!this.form.apellido) errors.apellido = "Apellido requerido.";
      if (!this.form.email) errors.email = "Email requerido.";
      else if (!this.isValidEmail(this.form.email)) {
        errors.email = "El email no tiene un formato válido.";
      }

      if (
        this.form.fecha_nacimiento &&
        this.form.fecha_nacimiento > this.todayDate
      ) {
        errors.fecha_nacimiento =
          "La fecha de nacimiento no puede ser mayor a la fecha actual.";
      }

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
