<template>
  <div class="grid gap-1.5">
    <label for="carrera_id" class="text-sm font-medium text-slate-700"
      >Carrera</label
    >
    <select
      id="carrera_id"
      :value="value"
      class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
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
