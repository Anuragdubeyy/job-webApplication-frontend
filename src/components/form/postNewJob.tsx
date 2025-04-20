import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { JobPostInput, JobPostSchema } from "../../schema/jobPostSchema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

const JobPostForm = () => {
  const form = useForm<JobPostInput>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      isRemote: false,
      salary: 0,
      type: "full-time",
      experienceLevel: "senior",
      benefits: "",
    },
  });

  const resetForm = () => {
    form.reset();
  };

  const onSubmit = async (data: JobPostInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("isRemote", data.isRemote ? "true" : "false");
    formData.append("salary", data.salary.toString());
    formData.append("type", data.type);
    formData.append("experienceLevel", data.experienceLevel);
    if (data.benefits) formData.append("benefits", data.benefits);

    try {
        const response = await axios.post(
          `http://localhost:8000/api/jobseeker/job/${id}/apply`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
            },
          }
        );
  
        toast.success("Application submitted successfully!");
        document.getElementById("close-modal")?.click(); // Close modal if exists
      } catch (error: any) {
        if (error.response?.status === 400) {
          toast.error(error.response.data.error || "Bad Request");
        } else {
          toast.error("Error submitting contact");
        }
        console.error("Error submitting contact:", error);
      }
    };
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Job Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Senior Full Stack Developer" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Job description here..." />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="San Francisco, CA" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="isRemote"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remote</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="salary"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="145000" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue="full-time"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="experienceLevel"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue="senior">
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="benefits"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="List benefits separated by commas (e.g., Health insurance, 401(k) matching)"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
