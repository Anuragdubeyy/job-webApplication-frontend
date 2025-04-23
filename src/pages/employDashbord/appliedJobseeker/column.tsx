import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { RowType } from "../../../constant";
import { useAppDispatch } from "../../../store/hooks";
import AlertConfirmation from "../../../components/common/AlertConfirmation";
import { MdDelete } from "react-icons/md";
import { Edit2 } from "lucide-react";
import { useState } from "react";
export const AppliedApplicantColumn = [
  {
    accessorKey: "idx",
    header: "Sr No.",
    cell: ({ row }: { row: RowType }) => row.index + 1,
  },
  {
    accessorKey: "applicant.name",
    header: "Applicant Name",
  },
  {
    accessorKey: "applicant.email",
    header: "Email",
  },
  {
    accessorKey: "experience[0].company_name",
    header: "Current Company",
    cell: ({ row }: { row: RowType }) =>
      row.original.experience.find((exp) => exp.currently_working)
        ?.company_name || "N/A",
  },
  {
    accessorKey: "job.title",
    header: "Job Title",
  },
  {
    accessorKey: "experience_year",
    header: "Experience (Years)",
  },
  {
    accessorKey: "notice_period",
    header: "Notice Period",
  },
  {
    accessorKey: "links",
    header: "Links",
    cell: ({ row }: { row: RowType }) => (
      <div className="flex space-x-2">
        {/* LinkedIn Button */}
        {row.original.linkedIn_link && (
          <a
            href={row.original.linkedIn_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full transition-all duration-300"
            title="View LinkedIn Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M19.5 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-11.25 14.25h-3v-7.5h3v7.5zm-1.5-8.625a1.725 1.725 0 11-.001-3.45 1.725 1.725 0 01.001 3.45zm13.125 8.625h-3v-4.125c0-1.23-.675-1.875-1.575-1.875s-1.725.675-1.725 1.875v4.125h-3v-7.5h3v.975a3.459 3.459 0 012.85-1.35c2.175 0 3.45 1.35 3.45 4.125v3.75z" />
            </svg>
          </a>
        )}

        {/* Portfolio Button */}
        {row.original.portfolio && (
          <a
            href={row.original.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-purple-500 text-purple-500 hover:text-white rounded-full transition-all duration-300"
            title="View Portfolio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h-2v-6h2v6zm1-7.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 7.5h-2v-4c0-1.1-.9-2-2-2h-4v-2h4a4 4 0 014 4v4z" />
            </svg>
          </a>
        )}
      </div>
    ),
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }: { row: RowType }) => (
      <div className="">
        <a
          href={row.original.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700  font-semibold"
        >
          Open Resume
        </a>
      </div>
    ),
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }: { row: RowType }) => {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            className="text-blue-500 underline hover:text-blue-700 transition-all duration-200"
          >
            {row.original.skills.length} skills
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <span className="sr-only">Open Skills Dialog</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Skills</DialogTitle>
                <DialogDescription>
                  Below are the skills associated with this applicant:
                </DialogDescription>
              </DialogHeader>
              <ul className="space-y-2">
                {row.original.skills.map((skill: string, index: number) => (
                  <li
                    key={index}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <DialogFooter>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  Close
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: RowType }) => (
      <span
        className={`text-xs font-medium px-2 py-1 rounded ${
          row.original.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : row.original.status === "approved"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
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
];
