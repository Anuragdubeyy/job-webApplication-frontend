import { RowType } from "../../../constant";

export const  EmployerJobPostColumn = [
    {
        accessorKey: 'idx',
        header: 'Sr No.',
        cell: ({ row }: { row: RowType }) => row.index + 1,
    },
    {
        accessorKey: 'title',
        header: 'Title',

    },
    {
        accessorKey: 'location',
        header: 'location',
        
    },
    {
        accessorKey: 'company',
        header: 'company',
        
    },
    {
        accessorKey: 'description',
        header: 'description',
        cell: ({ row }: { row: RowType }) => row.original.description.slice(0, 50) + '...',

    },

]