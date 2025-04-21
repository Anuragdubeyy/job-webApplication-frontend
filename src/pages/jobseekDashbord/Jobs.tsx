import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building2, Clock } from "lucide-react";
import { useStore } from "../../store";
import { getAllJobListAsync, selectAllJobList } from "../../store/slices/job";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { formatDistanceToNow } from "date-fns";

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function Jobs() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectAllJobList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllJobListAsync()).finally(() => setLoading(false));
  }, [dispatch]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(jobs.map((job) => job.category))];

  const parseDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading jobs...</div>;
  }

  return (
    <div className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Next Opportunity</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div
              className={`flex items-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg p-2 shadow-md`}
            >
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            } shadow-md`}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500">No jobs found.</div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => {
            const parsedDate = parseDate(job.createdAt.date); // Parse date safely
            return (
              <Link
                key={job._id}
                to={`/jobseeker/jobs/${job._id}`}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } p-6 rounded-lg shadow-md transition`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span className="mr-4">{job.company}</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {job.type}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {job.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-500 mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {parsedDate
                          ? `Posted ${formatDistanceToNow(parsedDate)} ago`
                          : "Posted recently"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Jobs;
