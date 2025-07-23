export interface Student {
  id: string;
  name: string;
  nis: string;
  grade: string;
  major: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  createdAt: string;
}

export type StudentFormData = Omit<Student, 'id' | 'createdAt'>;