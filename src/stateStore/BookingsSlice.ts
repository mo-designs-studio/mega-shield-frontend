import { StateCreator } from 'zustand';
import { Booking } from '@/types';

export interface BookingsSlice {
    bookingsState: Booking[] | null;
    setBookingsState: (payload: Booking) => void;
    resetBookingsState: () => void;
}

export const createBookingsSlice: StateCreator<BookingsSlice> = (set: Function) => ({
    bookingsState: null,
    setBookingsState: (payload) => set(() => ({ bookingsState: payload })),
    resetBookingsState: () => set(() => ({ bookingsState: null })),
});
