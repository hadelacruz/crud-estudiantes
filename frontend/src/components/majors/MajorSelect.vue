<template>
  <div class="field">
    <label for="carrera_id">Carrera</label>
    <select
      id="carrera_id"
      :value="value"
      @change="$emit('input', Number($event.target.value))"
    >
      <option disabled :value="0">Seleccione una carrera</option>
      <option v-for="carrera in majors" :key="carrera.id" :value="carrera.id">
        {{ carrera.nombre }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MajorSelect",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    majors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.field {
  display: grid;
  gap: 6px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
}

select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px;
}
</style>
