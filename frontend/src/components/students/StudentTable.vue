<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold text-slate-800">
      Listado de estudiantes
    </h2>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead
          class="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600"
        >
          <tr>
            <th class="px-3 py-2">Nombre</th>
            <th class="px-3 py-2">Apellido</th>
            <th class="px-3 py-2">Email</th>
            <th class="px-3 py-2">Fecha Nacimiento</th>
            <th class="px-3 py-2">Carrera</th>
            <th class="px-3 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="students.length === 0">
            <td colspan="6" class="px-3 py-5 text-center text-slate-500">
              No hay estudiantes registrados.
            </td>
          </tr>
          <tr
            v-for="student in students"
            :key="student.id"
            class="hover:bg-slate-50"
          >
            <td class="px-3 py-2">{{ student.nombre }}</td>
            <td class="px-3 py-2">{{ student.apellido }}</td>
            <td class="px-3 py-2">{{ student.email }}</td>
            <td class="px-3 py-2">{{ student.fecha_nacimiento || "-" }}</td>
            <td class="px-3 py-2">
              {{ student.carrera ? student.carrera.nombre : "-" }}
            </td>
            <td class="px-3 py-2">
              <div class="flex gap-2">
                <button
                  class="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                  @click="$emit('edit', student)"
                >
                  Editar
                </button>
                <button
                  class="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700"
                  @click="$emit('delete', student)"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "StudentTable",
  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
