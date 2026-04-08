<template>
  <section class="table-wrap">
    <h2>Listado de estudiantes</h2>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Fecha Nacimiento</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="students.length === 0">
          <td colspan="6" class="empty">No hay estudiantes registrados.</td>
        </tr>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.nombre }}</td>
          <td>{{ student.apellido }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.fecha_nacimiento || "-" }}</td>
          <td>{{ student.carrera ? student.carrera.nombre : "-" }}</td>
          <td class="actions">
            <button class="edit" @click="$emit('edit', student)">Editar</button>
            <button class="delete" @click="$emit('delete', student)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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

<style scoped>
.table-wrap {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
}

h2 {
  margin: 0 0 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid #e2e8f0;
  padding: 10px;
  text-align: left;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  border: 0;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  color: #fff;
}

.edit {
  background: #2563eb;
}

.delete {
  background: #dc2626;
}

.empty {
  text-align: center;
  color: #64748b;
}
</style>
