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
    const { mainServicesState, deleteMainService, setModalState } = useStatesStore();
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
                    {mainServicesState && mainServicesState.length > 0
                        ? mainServicesState.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="w-[150px] h-[100px] overflow-y-scroll no-scroll">
                                          <p>{item.description}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell>
                                      <img
                                          src={`${serverUrl}${item.photo}`}
                                          alt="service-photo"
                                          className="w-[250px] sm:m-3"
                                      />
                                  </TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell>{item.isAdditional ? 'خدمة اضافية' : 'خدمة اساسية'}</TableCell>
                                  <TableCell>
                                      <div className="flex items-center justify-center gap-4">
                                          <Button
                                              className="font-arabic me-3"
                                              onClick={() => {
                                                  deleteMainService({
                                                      id: item._id,
                                                  });
                                              }}
                                          >
                                              حذف الخدمة
                                          </Button>
                                          <Button
                                              className="font-arabic me-3"
                                              onClick={() => {
                                                  setModalState({
                                                      name: 'main-service',
                                                      mode: 'edit',
                                                      status: true,
                                                      extras: {
                                                          mainServiceId: item._id,
                                                      },
                                                  });
                                              }}
                                          >
                                              تعديل
                                          </Button>
                                          <Button
                                              className="font-arabic"
                                              onClick={() => {
                                                  navigate(`/dash/services/subservices/${item._id}`);
                                              }}
                                          >
                                              الخدمات الفرعية
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : 'لا توجد خدمات أساسية مسجلة.'}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
