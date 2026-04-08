<template>
  <main class="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6">
    <header class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-900">
        Gestion de Estudiantes
      </h1>
    </header>

    <p
      v-if="errorMessage"
      class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
    >
      {{ errorMessage }}
    </p>

    <StudentForm
      :student="editingStudent"
      :majors="majors"
      :reset-token="resetFormToken"
      @submit="handleSubmit"
      @cancel="cancelEdit"
    />

    <StudentTable :students="students" @edit="startEdit" @delete="askDelete" />

    <div
      v-if="deleteModal.open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <h3 class="text-lg font-semibold text-slate-900">
          Confirmar eliminacion
        </h3>
        <p class="mt-2 text-sm text-slate-600">
          Deseas eliminar a
          <span class="font-semibold text-slate-900">
            {{ deleteModal.student?.nombre }}
            {{ deleteModal.student?.apellido }}
          </span>
          ?
        </p>
        <div class="mt-4 flex justify-end gap-2">
          <button
            class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
            @click="closeDeleteModal"
          >
            Cancelar
          </button>
          <button
            class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            @click="confirmDelete"
          >
            Si, eliminar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="successModal.open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <h3 class="text-lg font-semibold text-slate-900">Operacion exitosa</h3>
        <p class="mt-2 text-sm text-slate-600">{{ successModal.message }}</p>
      </div>
    </div>
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
      errorMessage: "",
      resetFormToken: 0,
      successModalTimer: null,
      deleteModal: {
        open: false,
        student: null,
      },
      successModal: {
        open: false,
        message: "",
      },
    };
  },
  async created() {
    await this.loadInitialData();
  },
  beforeDestroy() {
    if (this.successModalTimer) {
      clearTimeout(this.successModalTimer);
      this.successModalTimer = null;
    }
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
    },
    openSuccessModal(message) {
      if (this.successModalTimer) {
        clearTimeout(this.successModalTimer);
      }

      this.successModal = {
        open: true,
        message,
      };

      this.successModalTimer = setTimeout(() => {
        this.closeSuccessModal();
      }, 2000);
    },
    closeSuccessModal() {
      this.successModal = {
        open: false,
        message: "",
      };

      if (this.successModalTimer) {
        clearTimeout(this.successModalTimer);
        this.successModalTimer = null;
      }
    },
    async handleSubmit(payload) {
      this.errorMessage = "";

      try {
        if (this.editingStudent) {
          await updateEstudiante(this.editingStudent.id, payload);
          this.openSuccessModal("Estudiante actualizado correctamente.");
        } else {
          await createEstudiante(payload);
        }

        this.editingStudent = null;
        this.resetFormToken += 1;
        await this.refreshStudents();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Ocurrio un error al guardar el estudiante.";
      }
    },
    askDelete(student) {
      this.errorMessage = "";
      this.deleteModal = {
        open: true,
        student,
      };
    },
    closeDeleteModal() {
      this.deleteModal = {
        open: false,
        student: null,
      };
    },
    async confirmDelete() {
      const student = this.deleteModal.student;
      if (!student) return;

      this.errorMessage = "";

      try {
        await deleteEstudiante(student.id);
        this.openSuccessModal("Estudiante eliminado correctamente.");
        if (this.editingStudent && this.editingStudent.id === student.id) {
          this.editingStudent = null;
          this.resetFormToken += 1;
        }
        await this.refreshStudents();
        this.closeDeleteModal();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Ocurrio un error al eliminar el estudiante.";
      }
    },
  },
};
</script>
