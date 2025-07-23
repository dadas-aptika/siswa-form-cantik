import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/student";
import { Search, Users, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface StudentListProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
}

export function StudentList({ students, onDeleteStudent }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data siswa "${name}"?`)) {
      onDeleteStudent(id);
      toast.success("Data siswa berhasil dihapus!");
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "X": return "bg-green-100 text-green-800 border-green-200";
      case "XI": return "bg-blue-100 text-blue-800 border-blue-200";
      case "XII": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMajorColor = (major: string) => {
    switch (major) {
      case "IPA": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "IPS": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Bahasa": return "bg-pink-100 text-pink-800 border-pink-200";
      case "TKJ": return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "RPL": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Akuntansi": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Data Siswa</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Kelola dan lihat data siswa yang terdaftar
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/20">
            {students.length} Siswa
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari siswa berdasarkan nama, NIS, kelas, atau jurusan..."
              className="pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? "Tidak ada siswa ditemukan" : "Belum ada data siswa"}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Coba ubah kata kunci pencarian Anda" 
                : "Tambahkan siswa pertama menggunakan form di atas"
              }
            </p>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Nama</TableHead>
                  <TableHead className="font-semibold">NIS</TableHead>
                  <TableHead className="font-semibold">Kelas</TableHead>
                  <TableHead className="font-semibold">Jurusan</TableHead>
                  <TableHead className="font-semibold">Jenis Kelamin</TableHead>
                  <TableHead className="font-semibold">Kontak</TableHead>
                  <TableHead className="font-semibold text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50 transition-smooth">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="font-mono text-sm">{student.nis}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getGradeColor(student.grade)}>
                        Kelas {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getMajorColor(student.major)}>
                        {student.major}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.phone && (
                          <div className="text-sm text-foreground">{student.phone}</div>
                        )}
                        {student.email && (
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-smooth"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0 hover:bg-blue-500 hover:text-white transition-smooth"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(student.id, student.name)}
                          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}