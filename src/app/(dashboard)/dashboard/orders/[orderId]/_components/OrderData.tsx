import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@prisma/client";

export function OrderData({ order }: { order: Order }) {
  return (
    <Table className="max-w-screen-md border">
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">اسم صاحب الطلب</TableCell>
          <TableCell className="font-medium">
            {order.order_maker_name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">اسم المقهى</TableCell>
          <TableCell className="font-medium">{order.cafe_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">fjklsjfl</TableCell>
          <TableCell className="font-medium">fjklsjfl</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">fjklsjfl</TableCell>
          <TableCell className="font-medium">fjklsjfl</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
