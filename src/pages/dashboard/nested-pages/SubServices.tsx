import { AddSubServiceModal } from "@/components";
import ContentTable from "@/components/sub-services/Table";
import { useParams } from "react-router-dom";
import { useStatesStore } from "@/stateStore";
import { useEffect } from "react";

const SubServices = () => {
  const { id } = useParams();

  const { subServicesState, loadAllMainServicesSubServices } = useStatesStore();
  useEffect(() => {
    loadAllMainServicesSubServices({ id });
  }, []);
  return (
    <div>
      <AddSubServiceModal id={id} withButton mode="add" />
      <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
        {subServicesState && <ContentTable headers={["اسم الخدمة", "الوصف", "الصورة", "الاصدار"]} items={subServicesState} />}
      </div>
    </div>
  );
};

export default SubServices;
