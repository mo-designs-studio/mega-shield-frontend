import { LoadData } from '.';
import { addBooking, getAllAppointments, getPendingAppointment, updateStatusToDone } from '@/api/endpoints';
import { toast } from 'react-toastify';

export const handleGetAllAppointments: LoadData = async (payload, getState) => {
    const { setBookingsState, setIsLoading } = getState!();
    setIsLoading(true);
    const { response, error } = await getAllAppointments();
    if (!error && response.status == 200) {
        setBookingsState(response.data.bookings);
    } else if (error) {
        toast(error.message, { type: 'error' });
    }

    setIsLoading(false);
};

export const handleGetPendingAppointments: LoadData = async (payload, getState) => {};
export const handleAddBooking: LoadData = async (payload, getState) => {
    const { response, error } = await addBooking(payload);
    if (!error && response.status == 201) {
        toast('تم اتمام حجزك بنجاح', { type: 'success' });
        setTimeout(() => window.location.replace('/'), 2000);
    } else if (error) toast(error.message, { type: 'error' });
};

export const handleUpdateBookingStatus: LoadData = async (payload, getState) => {
    const { bookingsState, setBookingsState } = getState!();
    const { response, error } = await updateStatusToDone(payload);
    if (!error && response.status == 200) {
        const updatedBookings = [...bookingsState];
        const updatedIndex = updatedBookings.findIndex((booking) => booking._id == payload.id);
        updatedBookings[updatedIndex].status = 'done';
        setBookingsState(updatedBookings);
    } else if (error) {
        toast(error.message, { type: 'error' });
    }
};

// export const handleDeletePackage: LoadData = async (payload, getState) => {
//     const { packagesState, setPackagesState } = getState!();
//     const { response, error } = await deletePackage(payload);
//     if (!error && response.status == 200) {
//         const updatedState = packagesState.filter((pkg: any) => pkg._id != payload.id);
//         setPackagesState(updatedState);
//     }
// };
