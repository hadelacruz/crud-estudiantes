<template>
  <main class="students-page">
    <header>
      <h1>Gestion de Estudiantes</h1>
    </header>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <StudentForm
      :student="editingStudent"
      :majors="majors"
      @submit="handleSubmit"
      @cancel="cancelEdit"
    />

    <StudentTable
      :students="students"
      @edit="startEdit"
      @delete="handleDelete"
    />
  </main>
</template>

<script>
import StudentForm from "@/components/students/StudentForm.vue";
import StudentTable from "@/components/students/StudentTable.vue";
import {
  createEstudiante,
  deleteEstudiante,
  fetchCarreras,
  fetchEstudiantes,
  updateEstudiante,
} from "@/api";

export default {
  name: "StudentsView",
  components: {
    StudentForm,
    StudentTable,
  },
  data() {
    return {
      majors: [],
      students: [],
      editingStudent: null,
      feedback: "",
      errorMessage: "",
    };
  },
  async created() {
    await this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      this.errorMessage = "";
      try {
        const [majorsRes, studentsRes] = await Promise.all([
          fetchCarreras(),
          fetchEstudiantes(),
        ]);
        this.majors = majorsRes.data;
        this.students = studentsRes.data;
      } catch (error) {
        this.errorMessage = "No se pudieron cargar los datos iniciales.";
      }
    },
    async refreshStudents() {
      const response = await fetchEstudiantes();
      this.students = response.data;
    },
    startEdit(student) {
      this.feedback = "";
      this.errorMessage = "";
      this.editingStudent = {
        id: student.id,
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
        fecha_nacimiento: student.fecha_nacimiento,
        carrera_id: student.carrera_id,
      };
    },
    cancelEdit() {
      this.editingStudent = null;
      this.feedback = "Edicion cancelada.";
    },
    async handleSubmit(payload) {
      this.feedback = "";
      this.errorMessage = "";

      try {
        if (this.editingStudent) {
          await updateEstudiante(this.editingStudent.id, payload);
          this.feedback = "Estudiante actualizado correctamente.";
        } else {
          await createEstudiante(payload);
          this.feedback = "Estudiante creado correctamente.";
        }

        this.editingStudent = null;
        await this.refreshStudents();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Ocurrio un error al guardar el estudiante.";
      }
    },
    async handleDelete(student) {
      this.feedback = "";
      this.errorMessage = "";

      const confirmed = window.confirm(
        `Deseas eliminar a ${student.nombre} ${student.apellido}?`
      );

      if (!confirmed) return;

      try {
        await deleteEstudiante(student.id);
        this.feedback = "Estudiante eliminado correctamente.";
        if (this.editingStudent && this.editingStudent.id === student.id) {
          this.editingStudent = null;
        }
        await this.refreshStudents();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Ocurrio un error al eliminar el estudiante.";
      }
    },
  },
};
</script>

<style scoped>
.students-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  gap: 16px;
}

header h1 {
  margin: 0;
}

header p {
  margin: 6px 0 0;
  color: #64748b;
}

.feedback {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: #ecfeff;
  color: #155e75;
}

.error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fee2e2;
  color: #991b1b;
}
</style>
