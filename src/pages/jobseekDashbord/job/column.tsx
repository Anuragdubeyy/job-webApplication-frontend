import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../../../components/ui/dialog";
import { RowType } from "../../../constant";
import { useAppDispatch } from "../../../store/hooks";
import AlertConfirmation from "../../../components/common/AlertConfirmation";
import { MdDelete, MdEdit } from "react-icons/md";
import { Edit2 } from "lucide-react";
export const  JoobkeerJobColumn = [
    {
        accessorKey: 'idx',
        header: 'Sr No.',
        cell: ({ row }: { row: RowType }) => row.index + 1,
    },
    {
        accessorKey: 'job.title',
        header: 'Title',

    },
    {
        accessorKey: 'job.location',
        header: 'location',
        
    },
    {
        accessorKey: 'job.company',
        header: 'company',
        
    },
    // {
    //     accessorKey: 'description',
    //     header: 'description',
    //     cell: ({ row }: { row: RowType }) => row.original.description.slice(0, 50) + '...',

    // },
    {
        accessorKey: "_id",
        header: "",
        cell: ({ row }: { row: RowType }) => {
          const dispatch = useAppDispatch();
    
        //   const deleteCompany = (id: string) => {
        //     // dispatch(DeleteCompanyAsync(id)).then(() => {
        //     //   dispatch(getCompanyListAsync({page:1, limit: ITEM_PER_PAGE}));
        //     });
        //   };
          return (
            <div className="flex gap-2 items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    disabled={row.original.isDeleted}
                    className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center rounded bg-transparent text-gray-900  hover:bg-transparent hover:scale-125 transition-all duration-500 ease-in-out disabled:opacity-30 "
                  >
                    {/* <EditNoteSharpIcon /> */}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80%] overflow-scroll">
                  <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogDescription>
                      Make changes to your Offer here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
    
                  {/* <UpdateContactForm contact={row.original} /> */}
                </DialogContent>
              </Dialog>
    
              <AlertConfirmation
                title="Are you sure?"
                description="This action cannot be undone"
                // onConfirm={() => deleteCompany(row.getValue("_id"))}
              >
                {!row.original.isDeleted ? (
                  <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center  rounded bg-transparent text-destructive   hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out ">
                    <MdDelete size={28} />
                  </Button>
                ) : (
                  <Button className="font-medium text-3xl text-center py-0.5 px-2 inline-flex items-center  rounded bg-transparent text-destructive   hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out ">
                    <Edit2 color="#FF8600" size={32} />
                  </Button>
                )}
              </AlertConfirmation>
            </div>
          );
        },
      },

]