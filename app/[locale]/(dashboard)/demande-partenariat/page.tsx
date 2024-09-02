// app/dashboard/partnership-requests/page.tsx
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
  import { PrismaClient } from "@prisma/client";
  import { PackageOpen } from "lucide-react";
  import Actions from "./_components/actions"; // Assurez-vous que ce composant existe
  
  const prisma = new PrismaClient();
  
  export default async function PartnershipRequestsPage() {
    // Récupérer les demandes de partenariat depuis la base de données
    const requests = await prisma.partnershipRequest.findMany();
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Demandes de Partenariat</CardTitle>
          <CardDescription>
            Gérez toutes les demandes de partenariat envoyées à la plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l'Auto-École</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Numéro de Téléphone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                      <PackageOpen className="size-5" strokeWidth={1.5} />
                      <p className="font-medium text-sm">
                        Aucune demande de partenariat pour le moment
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.schoolName}
                  </TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.phone}</TableCell>
                  <TableCell>{request.message}</TableCell>
                  <TableCell>
                    <Actions id={request.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }