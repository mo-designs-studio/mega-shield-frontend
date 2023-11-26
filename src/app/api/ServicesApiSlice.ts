import {
  AddPackageProps,
  AddSubServiceProps,
  Booking,
  BookingProps,
  MainService,
  MainServiceProps,
  Package,
  Service,
} from "@/types"
import { apiSlice } from "./api"

const ServicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    AddMainService: builder.mutation<
      void,
      MainServiceProps
    >({
      query: arg => ({
        url: "/mainservices/addMainService",
        method: "POST",
        body: JSON.stringify(arg),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    ToggleBookingStateToDone: builder.mutation<
      void,
      { id: string }
    >({
      query: arg => ({
        url: `/bookings/changeStatus/${arg.id}`,
        method: "PATCH",
        body: JSON.stringify({
          status: "done",
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    UpdateMainService: builder.mutation<
      void,
      { arg: Partial<MainServiceProps>; id: string }
    >({
      query: arg => ({
        url: `/mainservices/updateMainService/${arg.id}`,
        method: "PATCH",
        body: JSON.stringify(arg.arg),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    DeleteMainService: builder.mutation<
      void,
      { id: string }
    >({
      query: arg => ({
        url: `/mainservices/deleteMainService/${arg.id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["mainServices"],
    }),
    GetServiceByID: builder.query<
      MainService,
      { id: string }
    >({
      query: arg => ({
        url: `/mainservices/${arg.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    GetAllBookings: builder.query<
      { bookings: Booking[]; count: number },
      any
    >({
      query: () => ({
        url: `/bookings/allAppointments`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    GetAllBendingBookings: builder.query<
      { appointments: Booking[]; count: number },
      any
    >({
      query: () => ({
        url: `/bookings/pendingAppointments`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    // GetAllMainServices: builder.query<
    //   { mainServices: MainService[]; count: number },
    //   any
    // >({
    //   query: () => ({
    //     url: `/mainservices/allMainServices`,
    //     credentials: "include",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }),
    //   providesTags: ["mainServices"],
    // }),
    GetSubServices: builder.query<
      { services: Service[]; count: number },
      { id: string }
    >({
      query: args => ({
        url: `/services/mainService/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices", "subServices"],
    }),
    AddSubService: builder.mutation<
      { services: Service[]; count: number },
      { service: AddSubServiceProps }
    >({
      query: args => ({
        url: `/services/addService`,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(args.service),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices", "subServices"],
    }),
    DeleteSubService: builder.mutation<any, { id: string }>(
      {
        query: args => ({
          url: `/services/deleteService/${args.id}`,
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }),
        invalidatesTags: ["mainServices", "subServices"],
      }
    ),
    UpdateSubService: builder.mutation<
      any,
      { id: string; props: Partial<Service> }
    >({
      query: args => ({
        url: `/services/updateService/${args.id}`,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices", "subServices"],
    }),
    AddPackage: builder.mutation<
      any,
      { id: string; props: AddPackageProps }
    >({
      query: args => ({
        url: `/packages/${args.id}/addPackage`,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    GetSubServiceByID: builder.query<
      Service,
      { id: string }
    >({
      query: args => ({
        url: `/services/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices", "subServices"],
    }),
    GetSubServicePackages: builder.query<
      { packages: Package[]; count: number },
      { id: string }
    >({
      query: args => ({
        url: `/services/servicePackages/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    GetPackageByID: builder.query<Package, { id: string }>({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    DeletePackage: builder.mutation<any, { id: string }>({
      query: args => ({
        url: `/packages/deletePackage/${args.id}`,
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    UpdatePackage: builder.mutation<
      any,
      { id: string; props: Partial<AddPackageProps> }
    >({
      query: args => ({
        url: `/packages/updatePackage/${args.id}`,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    AddBooking: builder.mutation<any, BookingProps>({
      query: args => ({
        url: `/bookings/makeAppointment`,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
  }),
})

export const {
  useAddMainServiceMutation,
  useUpdateMainServiceMutation,
  useGetServiceByIDQuery,
  // useGetAllMainServicesQuery,
  useDeleteMainServiceMutation,
  useGetAllBookingsQuery,
  useToggleBookingStateToDoneMutation,
  useGetAllBendingBookingsQuery,
  useGetSubServicesQuery,
  useAddSubServiceMutation,
  useDeleteSubServiceMutation,
  useGetSubServiceByIDQuery,
  useGetSubServicePackagesQuery,
  useUpdateSubServiceMutation,
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetPackageByIDQuery,
  useUpdatePackageMutation,
  useAddBookingMutation,
} = ServicesApiSlice
