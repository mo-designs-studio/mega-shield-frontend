import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { For } from '@dev-amr/react-sugartax';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useStatesStore } from '@/stateStore';

type ContentTableProps = {
    headers: string[];
};

const ContentTable = ({ headers }: ContentTableProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();
    const { subServicesState, deleteSubService, setModalState } = useStatesStore();
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
                    {subServicesState && subServicesState.length > 0
                        ? subServicesState.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="w-[150px] h-[100px] overflow-y-scroll">
                                          <p>{item.description}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell>
                                      <img
                                          src={`${serverUrl}${item.photo}`}
                                          alt="service-photo"
                                          className="w-[250px] m-3"
                                      />
                                  </TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell className="">
                                      <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                                          <Button
                                              onClick={() => {
                                                  deleteSubService({ id: item._id });
                                              }}
                                          >
                                              حذف
                                          </Button>
                                          <Button
                                              onClick={() => {
                                                  setModalState({
                                                      name: 'sub-service',
                                                      mode: 'edit',
                                                      status: true,
                                                      extras: {
                                                          serviceId: item._id,
                                                      },
                                                  });
                                              }}
                                          >
                                              تعديل
                                          </Button>
                                          <Button
                                              onClick={() => {
                                                  navigate(`/dash/services/packages/${item._id}`);
                                              }}
                                          >
                                              الباقات
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : 'لا توجد خدمات مسجلة'}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
