"use client";

import DeleteModel from "@/components/models/DeleteModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function DataTable({ users }: { users: User[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/users/${selectedUser}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("تم حذف المستخدم بنجاح");
    },
  });

  const handleDelete = async () => {
    mutate();

    setIsOpen(false);
  };

  return (
    <>
      <DeleteModel
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={handleDelete}
        title="حذف المستخدم"
        description="هل أنت متأكد من حذف المستخدم؟"
      />
      <div className="px-5 pb-5 md:px-20">
        <Table dir="rtl" className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                أسم المستخدم
              </TableHead>
              <TableHead className="text-center text-lg">الإيمال</TableHead>
              <TableHead className="text-center text-lg">الصلاحيه</TableHead>
              <TableHead className="text-center text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.name}>
                <TableCell className="font-medium text-center">
                  {user.name}
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.role}</TableCell>
                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/users/${user.id}`}>
                    <Button className="text-sm" variant="secondary">
                      تعديل
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedUser(user.id);
                      setIsOpen(true);
                    }}
                    className="text-sm"
                    variant="destructive"
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
