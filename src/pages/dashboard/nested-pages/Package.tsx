import AddPackageModal from "@/components/AddPackageModal";
import ContentTable from "@/components/Table";
import { useParams } from "react-router-dom";
import { useStatesStore } from "@/stateStore";
import { useEffect } from "react";

const Package = () => {
  const { id } = useParams();
  const { packagesState, loadAllServicePackages } = useStatesStore();
  useEffect(() => {
    loadAllServicePackages({ id });
  }, []);
  return (
    <div>
      <AddPackageModal mode="add" withButton id={id} />

      <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
        {packagesState && (
          <ContentTable
            mode="packages"
            headers={["اسم الباقة", "الوصف", "السعر للسيارات الصغيرة", "السعر للسيارات المتوسطة", "السعر للسيارات الكبيرة", "الاصدار"]}
            items={packagesState}
          />
        )}
      </div>
    </div>
  );
};
export default Package;
