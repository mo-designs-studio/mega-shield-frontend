import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Service } from "@/types";
import { For } from "@dev-amr/react-sugartax";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { toggleEditSubServiceModal } from "@/app/features/ProductSlice";
import EditSubServiceModal from "./EditSubServiceModal";
import { useStatesStore } from "@/stateStore";

type ContentTableProps = {
  headers: string[];
  items: Service[];
};

const ContentTable = ({ headers, items }: ContentTableProps) => {
  const [subServiceID, setSubServiceID] = useState("");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { deleteSubService } = useStatesStore();
  return (
    <>
      {subServiceID !== "" && <EditSubServiceModal id={subServiceID} />}
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
          {items && items.length > 0
            ? items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="w-[150px] h-[100px] overflow-y-scroll">
                      <p>{item.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <img src={`${serverUrl}${item.photo}`} alt="service-photo" className="w-[250px] m-3" />
                  </TableCell>
                  <TableCell>{item.__v}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                      <Button
                        onClick={() => {
                          deleteSubService({ id: item._id });
                        }}>
                        حذف
                      </Button>
                      <Button
                        onClick={() => {
                          setSubServiceID(item._id);
                          dispatch(toggleEditSubServiceModal(true));
                        }}>
                        تعديل
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/dash/services/packages/${item._id}`);
                        }}>
                        الباقات
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : "لا توجد خدمات مسجلة"}
        </TableBody>
      </Table>
    </>
  );
};
export default ContentTable;
