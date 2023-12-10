import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { For } from '@dev-amr/react-sugartax';
import { Button } from '../ui/button';
import { useStatesStore } from '@/stateStore';
import { useEffect } from 'react';

type ContentTableProps = {
    headers: string[];
};

const ContentTable = ({ headers }: ContentTableProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const { productsState, loadAllProducts, deleteProduct, setModalState } = useStatesStore();

    useEffect(() => {
        loadAllProducts(null);
    }, []);

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
                    {productsState && productsState.length > 0
                        ? productsState.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="w-[150px] h-[100px] overflow-y-scroll no-scroll">
                                          <p>{item.description}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell>{item.price}</TableCell>
                                  <TableCell>
                                      <img
                                          src={`${serverUrl}${item.photo}`}
                                          alt="service-photo"
                                          className="w-[250px] sm:m-3"
                                      />
                                  </TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell>
                                      <div className="flex items-center justify-center gap-4">
                                          <Button
                                              className="font-arabic me-3"
                                              onClick={() => {
                                                  deleteProduct({
                                                      id: item._id,
                                                  });
                                              }}
                                          >
                                              حذف
                                          </Button>
                                          <Button
                                              className="font-arabic me-3"
                                              onClick={() => {
                                                  setModalState({
                                                      name: 'product',
                                                      mode: 'edit',
                                                      status: true,
                                                      extras: {
                                                          productId: item._id,
                                                      },
                                                  });
                                              }}
                                          >
                                              تعديل
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : 'لا توجد منتجات مسجلة.'}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
