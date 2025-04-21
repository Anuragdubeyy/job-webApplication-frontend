import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin, Building2, Clock, Send } from "lucide-react";
import { useStore } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSingleJobAsync, selectSingleJob } from "../../store/slices/job";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

function JobDetails() {
  const { id } = useParams();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = localStorage.getItem("role");
  const job = useAppSelector(selectSingleJob);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate(`/jobseeker/application/${id}`);
  };
  useEffect(() => {
    if (id) {
      dispatch(getSingleJobAsync(id));
    }
  }, [dispatch, id]);

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
      <div className="mb-4">
        <Link to="/jobs">
          <Button>ALL JOB</Button>
        </Link>
      </div>
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md p-8 mb-8`}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div className="flex items-center text-gray-500 mb-4">
              <Building2 className="w-5 h-5 mr-2" />
              <span className="mr-4">{job.company}</span>
              <MapPin className="w-5 h-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {job.type}
              </span>
            </div>
          </div>
          <div className="text-right ">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ${job.salary?.toLocaleString()}
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-5 h-5 mr-2" />
              <span>
                Posted on{" "}
                {job.createdAt?.date
                  ? new Date(job.createdAt.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            {currentUser === "jobseeker" && (

              <Button onClick={handleApplyNow} className="w-full mt-6  bg-blue-600 text-white  rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                <Send className="w-4 h-4" />
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-8 mb-8`}
          >
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="mb-6 whitespace-pre-line">{job.description}</p>

            <h3 className="text-xl font-bold mb-4">Requirements</h3>
            <ul className="list-disc pl-6 space-y-2">
              {job.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-8`}
          >
            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
            <div className="flex items-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">{job.company}</h3>
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>
            <p className="text-gray-500">
              Leading technology company specializing in innovative solutions...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
