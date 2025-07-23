import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Student, StudentFormData } from "@/types/student";
import { UserPlus, GraduationCap } from "lucide-react";

interface StudentFormProps {
  onSubmit: (student: StudentFormData) => void;
}

export function StudentForm({ onSubmit }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    nis: "",
    grade: "",
    major: "",
    phone: "",
    email: "",
    address: "",
    birthDate: "",
    gender: "Laki-laki",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.nis || !formData.grade || !formData.major) {
      toast.error("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: "",
      nis: "",
      grade: "",
      major: "",
      phone: "",
      email: "",
      address: "",
      birthDate: "",
      gender: "Laki-laki",
    });

    toast.success("Data siswa berhasil ditambahkan!");
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Form Data Siswa</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Tambahkan data siswa baru ke dalam sistem
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Nama Lengkap *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nis" className="text-foreground font-medium">
                NIS (Nomor Induk Siswa) *
              </Label>
              <Input
                id="nis"
                value={formData.nis}
                onChange={(e) => handleInputChange("nis", e.target.value)}
                placeholder="Masukkan NIS"
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="text-foreground font-medium">
                Kelas *
              </Label>
              <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X">Kelas X</SelectItem>
                  <SelectItem value="XI">Kelas XI</SelectItem>
                  <SelectItem value="XII">Kelas XII</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="major" className="text-foreground font-medium">
                Jurusan *
              </Label>
              <Select value={formData.major} onValueChange={(value) => handleInputChange("major", value)}>
                <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Pilih jurusan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IPA">IPA (Ilmu Pengetahuan Alam)</SelectItem>
                  <SelectItem value="IPS">IPS (Ilmu Pengetahuan Sosial)</SelectItem>
                  <SelectItem value="Bahasa">Bahasa</SelectItem>
                  <SelectItem value="TKJ">TKJ (Teknik Komputer Jaringan)</SelectItem>
                  <SelectItem value="RPL">RPL (Rekayasa Perangkat Lunak)</SelectItem>
                  <SelectItem value="Akuntansi">Akuntansi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-foreground font-medium">
                Jenis Kelamin
              </Label>
              <Select value={formData.gender} onValueChange={(value: "Laki-laki" | "Perempuan") => handleInputChange("gender", value)}>
                <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-foreground font-medium">
                Tanggal Lahir
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Nomor Telepon
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Masukkan email"
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground font-medium">
              Alamat
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Masukkan alamat lengkap"
              className="transition-smooth focus:ring-2 focus:ring-primary/20 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              size="lg"
              className="bg-gradient-primary hover:shadow-elegant transition-smooth px-8"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Tambah Siswa
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}