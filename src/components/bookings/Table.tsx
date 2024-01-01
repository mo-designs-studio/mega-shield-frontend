import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { For } from '@dev-amr/react-sugartax';
import { Button } from '../ui/button';
import { useStatesStore } from '@/stateStore';
import { Booking } from '@/types';

type ContentTableProps = {
    headers: string[];
    bookings: Booking[]
};

const ContentTable = ({ headers, bookings }: ContentTableProps) => {

    const { updateBookingStatus } = useStatesStore();
    return (
        <>
            <Table className="font-arabic my-5 min-w-[767px]">
                <TableHeader>
                    <TableRow>
                        <For each={headers}>
                            {(item, i) => (
                                <TableHead className="text-right text-primary" key={i}>
                                    {item}
                                </TableHead>
                            )}
                        </For>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings && bookings.length > 0
                        ? bookings.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{item.customerFname + ' ' + item.customerLname}</TableCell>
                                <TableCell>{item.customerPhone}</TableCell>
                                <TableCell>
                                    {new Date(item.date).toLocaleDateString() +
                                        ' ' +
                                        new Date(item.date).toLocaleTimeString()}
                                </TableCell>
                                <TableCell>{item.carSize}</TableCell>
                                <TableCell className="flex items-center gap-4 flex-wrap text-primary">
                                    {item.service.map((service, i) => (
                                        <span key={i}>{service}</span>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button
                                    disabled={item.status === 'done'}
                                        onClick={() => {
                                            updateBookingStatus({ id: item._id });
                                        }}
                                    >
                                        تمييز كمنجز
                                    </Button>
                                </TableCell>
                                <TableCell>{item.status === 'done' ? 'منجز' : 'غير منجز'}</TableCell>
                            </TableRow>
                        ))
                        : 'لا توجد حجوزات مسجلة.'}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
