import { useState } from "react";
import { Student, StudentFormData } from "@/types/student";
import { StudentForm } from "@/components/StudentForm";
import { StudentList } from "@/components/StudentList";
import { StudentStats } from "@/components/StudentStats";
import { GraduationCap, School } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = (studentData: StudentFormData) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-primary rounded-xl text-white shadow-elegant">
              <School className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Sistem Manajemen Data Siswa
              </h1>
              <p className="text-muted-foreground mt-1">
                Platform digital untuk mengelola data siswa dengan mudah dan efisien
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <StudentStats students={students} />

        {/* Form Section */}
        <div className="mb-8">
          <StudentForm onSubmit={handleAddStudent} />
        </div>

        {/* List Section */}
        <StudentList 
          students={students} 
          onDeleteStudent={handleDeleteStudent} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <GraduationCap className="h-5 w-5" />
            <span>Sistem Manajemen Data Siswa - Dibuat dengan ❤️</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
