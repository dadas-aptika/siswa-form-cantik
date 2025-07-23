import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types/student";
import { Users, GraduationCap, UserCheck, BookOpen } from "lucide-react";

interface StudentStatsProps {
  students: Student[];
}

export function StudentStats({ students }: StudentStatsProps) {
  const totalStudents = students.length;
  
  const gradeStats = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const majorStats = students.reduce((acc, student) => {
    acc[student.major] = (acc[student.major] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderStats = students.reduce((acc, student) => {
    acc[student.gender] = (acc[student.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statCards = [
    {
      title: "Total Siswa",
      value: totalStudents,
      icon: Users,
      color: "bg-primary",
    },
    {
      title: "Siswa Laki-laki",
      value: genderStats["Laki-laki"] || 0,
      icon: UserCheck,
      color: "bg-blue-500",
    },
    {
      title: "Siswa Perempuan", 
      value: genderStats["Perempuan"] || 0,
      icon: UserCheck,
      color: "bg-pink-500",
    },
    {
      title: "Jurusan Aktif",
      value: Object.keys(majorStats).length,
      icon: BookOpen,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-card border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className={`${stat.color} p-4 text-white`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="p-4 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}