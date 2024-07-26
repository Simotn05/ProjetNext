import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { PackageOpen } from "lucide-react";
import Actions from "./_components/actions";

export default async function TicketsPage() {
  const complains = await db.message.findMany();

  return (
    <Card>
      <CardHeader>
        <CardTitle>الشكايات</CardTitle>
        <CardDescription>
          سير جميع الشكايات التي تم إرسالها للمنصة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الإسم الكامل</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead className="hidden md:table-cell">المدينة</TableHead>
              <TableHead className="hidden md:table-cell">
                إسم المدرسة
              </TableHead>
              <TableHead className="hidden md:table-cell">الرسالة</TableHead>
              <TableHead>
                <span className="sr-only">الأفعال</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complains.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                    <PackageOpen className="size-5" strokeWidth={1.5} />
                    <p className="font-medium text-sm">
                      لا يوجد شكايات حتى الآن
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {complains.map((complain) => (
              <TableRow key={complain.id}>
                <TableCell className="font-medium">
                  <span>{complain.name}</span>
                </TableCell>
                <TableCell dir="ltr" className="text-right">
                  <a href={`tel:${complain.phone}`}>{complain.phone}</a>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {complain.city}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {complain.autoEcole}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {complain.message}
                </TableCell>
                <TableCell>
                  <Actions id={complain.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardFooter className="flex gap-4 items-center">
        <p className="text-sm text-muted-foreground">
          عرض <span className="font-bold">1-10</span> من{" "}
          <span className="font-bold">32</span> طلب مساعدة
        </p>
      </CardFooter> */}
    </Card>
  );
}
