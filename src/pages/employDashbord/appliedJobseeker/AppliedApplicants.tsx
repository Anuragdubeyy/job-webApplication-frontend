import { useEffect, useRef } from "react";
import DataTable from "../../../components/common/DataTable";
import { Search } from "lucide-react";
import { AppliedApplicantColumn } from "./column";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store";
import {
  getAllJobApplicantListAsync,
  selectAllJobApplicantList,
} from "../../../store/slices/employer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export default function AppliedApplicants() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  const tableRef = useRef<null>(null);
  const dispatch = useAppDispatch();
  const JobApplicant = useAppSelector(selectAllJobApplicantList || []);
  const navigate = useNavigate();
  const handelonClick = () => {
    navigate("/create-job-post");
  };
  useEffect(() => {
    dispatch(getAllJobApplicantListAsync());
  }, [dispatch]);

  return (
    <div
      className={`p-2 bg-gray-100 min-h-screen ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="flex justify-between gap-4">
        <h1 className="text-xl font-bold text-indigo-950 mb-4">
          job Applicants
        </h1>
        <div className="flex items-center border border-input bg-background rounded ring-offset-background">
          <Search className="ml-5 text-gray-500" />
          <input
            placeholder="Search"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button onClick={handelonClick}>Add New Job</Button>
      </div>

      <div className="bg-white p-2 mt-2 rounded-lg shadow-md h-[90vh]">
        <div className="h-[74vh] flex flex-col w-full mt-1 overflow-hidden border rounded-lg">
          <div className="w-full overflow-x-auto mb-5">
            <div className="min-w-max">
              <DataTable
                tableRef={tableRef}
                columns={AppliedApplicantColumn}
                data={JobApplicant}
              />
            </div>
          </div>

          <div className="absolute  bg-white bottom-0 left-12 right-0 items-center ">
            {/* <Pagination
                    page={currentSentLogPage}
                    totalProducts={totalSentLog}
                    handlePage={handleSentPageChange}
                /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
