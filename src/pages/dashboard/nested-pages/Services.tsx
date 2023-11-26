import { NavLink, ServiceModal } from "@/components"
import ContentTable from "@/components/Table"
import { Route, Routes } from "react-router-dom"
import SubServices from "./SubServices"
import Bookings from "./Bookings"
import Package from "./Package"
import { useStatesStore } from "@/stateStore";

const Services = () => {
  const { mainServicesState } = useStatesStore();


  return (
    <div>
      <header className="flex items-center justify-start my-6 gap-4">
        <NavLink children="الخدمات" to="/dash/services" />
        <NavLink
          children="الحجوزات"
          to="/dash/services/bookings"
        />
      </header>
      <Routes>
        <Route
          index
          element={
            <>
              <ServiceModal mode="add" withButton />
              <div className="overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                {mainServicesState && (
                  <ContentTable
                    mode="main-services"
                    headers={[
                      "الاسم",
                      "الوصف",
                      "الصورة",
                      "الاصدار",
                    ]}
                    items={mainServicesState}
                  />
                )}
              </div>
            </>
          }
        />
        <Route
          path="/subservices/:id"
          element={<SubServices />}
        />
        <Route path="/packages/:id" element={<Package />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
  )
}
export default Services
