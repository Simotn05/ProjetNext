"use client";

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
import { PackageOpen } from "lucide-react";
import Actions from "./_components/actions";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PartnershipRequest = {
  id: number;
  schoolName: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: Date;
};

export default function PartnershipRequestsPage() {
  const [requests, setRequests] = useState<PartnershipRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch("/api3/partnership-requests");
      const data: PartnershipRequest[] = await response.json();
      setRequests(data);
    }
  
    fetchRequests();
  }, []);
  

  const filteredRequests = statusFilter
    ? requests.filter((request) => request.status === statusFilter)
    : requests;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes de Partenariat</CardTitle>
        <CardDescription>
          Gérez toutes les demandes de partenariat envoyées à la plateforme.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <Select onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Accepté">Accepté</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="all">Tous les statuts</SelectItem>
              </SelectContent>
              </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'Auto-École</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Numéro de Téléphone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                    <PackageOpen className="size-5" strokeWidth={1.5} />
                    <p className="font-medium text-sm">
                      Aucune demande de partenariat pour le moment
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.schoolName}
                </TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.status}</TableCell>
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
