import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddNewAutoEcoleForm from "@/components/forms/add-new-auto-ecole";

export default async function EcolesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إضافة مدرسة تعليم السياقة</CardTitle>
        <CardDescription>
          إملأ جميع المعلومات التالية لإضافة مدرسة تعليم السياقة جديدة للنظام.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddNewAutoEcoleForm />
      </CardContent>
    </Card>
  );
}
