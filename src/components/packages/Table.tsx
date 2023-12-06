import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { For } from '@dev-amr/react-sugartax';
import { Button } from '../ui/button';
import { useStatesStore } from '@/stateStore';

type ContentTableProps = {
    headers: string[];
};

const ContentTable = ({ headers }: ContentTableProps) => {
    const { packagesState, deletePackage, setModalState } = useStatesStore();
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
                    {packagesState && packagesState.length > 0
                        ? packagesState.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="flex items-start justify-center gap-3 flex-col">
                                          {item.description.map((feature, i) => (
                                              <span
                                                  key={i}
                                                  className={
                                                      i !== item.description.length - 1
                                                          ? 'border-b border-solid border-primary pb-3'
                                                          : ''
                                                  }
                                              >
                                                  {feature}
                                              </span>
                                          ))}
                                      </div>
                                  </TableCell>
                                  <TableCell>{item.smallPrice}$</TableCell>
                                  <TableCell>{item.mediumPrice}$</TableCell>
                                  <TableCell>{item.bigPrice}$</TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell className="">
                                      <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                                          <Button
                                              onClick={() => {
                                                  deletePackage({ id: item._id });
                                              }}
                                          >
                                              حذف
                                          </Button>
                                          <Button
                                              onClick={() => {
                                                  setModalState({
                                                      name: 'package',
                                                      mode: 'edit',
                                                      status: true,
                                                      extras: {
                                                          packageId: item._id,
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
                        : 'لا توجد باقات مسجلة'}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
