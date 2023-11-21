import {
  useGetAllBendingBookingsQuery,
  useGetAllBookingsQuery,
} from "@/app/api/ServicesApiSlice"
import ContentTable from "@/components/Table"
import { useState } from "react"

const Bookings = () => {
  const [pending, setPending] = useState(false)

  const { data: items, isLoading } =
    useGetAllBookingsQuery("")

  const { data: pendingItems } =
    useGetAllBendingBookingsQuery("")

  if (isLoading) return "loading..."

  return (
    <div>
      <form className="my-5">
        <div className="flex items-center gap-3 text-sm font-arabic">
          <input
            type="radio"
            name="filter"
            id="filter-1"
            onChange={e => {
              if (e.target.checked) setPending(false)
            }}
          />
          <label htmlFor="filter-1">عرض الكل</label>
        </div>

        <div className="flex items-center gap-3 text-sm font-arabic">
          <input
            type="radio"
            name="filter"
            id="filter-2"
            onChange={e => {
              if (e.target.checked) setPending(true)
            }}
          />
          <label htmlFor="filter-2">
            عرض الحجوزات المتظرة
          </label>
        </div>
      </form>
      <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
        {items && pendingItems && (
          <ContentTable
            items={
              pending
                ? pendingItems?.appointments
                : items?.bookings
            }
            mode="booking"
            headers={[
              "اسم العميل",
              "رقم الهاتف",
              "التاريخ",
              "حجم السيارة",
              "الباقات و الاضافات",
            ]}
          />
        )}
      </div>
    </div>
  )
}
export default Bookings
