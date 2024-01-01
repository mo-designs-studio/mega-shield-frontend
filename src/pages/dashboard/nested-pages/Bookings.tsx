import ContentTable from '@/components/bookings/Table';
import { useEffect, useState } from 'react';
import { useStatesStore } from '@/stateStore';
import { Booking } from '@/types';

const Bookings = () => {
    const [showPending, setShowPending] = useState(false);
    const [pendingItems, setPendingItems] = useState<Booking[] | null>();

    const { isLoading, loadAllAppointments, bookingsState } = useStatesStore();
    useEffect(() => {
        if (bookingsState) {
            const pendingList = bookingsState.filter((booking) => booking.status == 'pending');
            setPendingItems(pendingList);
        }
    }, [showPending, bookingsState]);

    useEffect(() => {
        loadAllAppointments(null);
    }, []);

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <form className="my-5">
                        <div className="flex items-center gap-3 text-sm font-arabic">
                            <input
                                type="radio"
                                name="filter"
                                id="filter-1"
                                onChange={(e) => {
                                    if (e.target.checked) setShowPending(false);
                                }}
                            />
                            <label htmlFor="filter-1">عرض الكل</label>
                        </div>

                        <div className="flex items-center gap-3 text-sm font-arabic">
                            <input
                                type="radio"
                                name="filter"
                                id="filter-2"
                                onChange={(e) => {
                                    if (e.target.checked) setShowPending(true);
                                }}
                            />
                            <label htmlFor="filter-2">عرض الحجوزات المتظرة</label>
                        </div>
                    </form>
                    <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                        {bookingsState && !isLoading && (
                            <ContentTable
                                bookings={pendingItems && showPending ? pendingItems : bookingsState}
                                headers={['اسم العميل', 'رقم الهاتف', 'التاريخ', 'حجم السيارة', 'الباقات و الاضافات']}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
export default Bookings;
