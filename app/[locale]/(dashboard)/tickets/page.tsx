import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import TickerActions from "./_components/ticker-actions";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import TicketsFilter from "./_components/filters";

type Props = {
  searchParams: {
    completed: string;
  }
}

export default async function TicketsPage({searchParams}: Props) {
  const tickets = await db.ticket.findMany({
    where: {
      status: searchParams.completed == "true" ? "completed" : "pending",
    },
  });

  return (
    <Card>
      <CardHeader>
          <CardTitle>{searchParams.completed == "true" ? "طلبات المساعدة المكتملة" : "طلبات المساعدة"}</CardTitle>

          <CardDescription>
            سير جميع طلبات المساعدة التي تم إرسالها للمنصة.
          </CardDescription>
      </CardHeader>
      <CardContent>

        <TicketsFilter />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الإسم الكامل</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead className="hidden md:table-cell">المدينة</TableHead>
              <TableHead className="hidden md:table-cell">
                نوع المساعدة
              </TableHead>
              <TableHead className="hidden md:table-cell">الصنف</TableHead>
              <TableHead>
                <span className="sr-only">الأفعال</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                    <PackageOpen className="size-5" strokeWidth={1.5} />
                    <p className="font-medium text-sm">
                      لا يوجد طلبات مساعدة حتى الآن
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  <span>{ticket.name}</span>
                  <span className="md:hidden block text-sm text-muted-foreground">
                    {ticket.city} - {ticket.type} - {ticket.permis}
                  </span>
                </TableCell>
                <TableCell dir="ltr" className="text-right">
                  <a href={`tel:${ticket.phone}`}>{ticket.phone}</a>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {ticket.city}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {ticket.type}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  الرخصة {ticket.permis}
                </TableCell>
                <TableCell>
                  <TickerActions id={ticket.id} />
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
