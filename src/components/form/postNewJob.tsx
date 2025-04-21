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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobPostForm = () => {
  const [requirementInput, setRequirementInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");
const navigate = useNavigate();
  const [requirements, setRequirements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);

  const form = useForm<JobPostInput>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      isRemote: false,
      salary: 0,
      type: "",
      experienceLevel: "",
      benefits: "",
      requirements: [],
      skillsRequired: [],
      responsibilities: [],
      applicationDeadline: "",
      company: "",
      category: "",
    },
  });
  const resetForm = () => {
    form.reset();
    setRequirements([]);
    setSkills([]);
    setResponsibilities([]);
  };

  const onSubmit = async (data: JobPostInput) => {
    console.log(data);
    const formData = {
      ...data,
      requirements,
      skillsRequired: skills,
      responsibilities,
    };
    console.log(formData);
    try {
      const token = localStorage.getItem("jobToken");
      const response = await axios.post(
        `http://localhost:5000/api/employers/jobs/create`,
        formData,
        { headers: {"Authorization": `Bearer ${token}`,"Content-Type": "application/json" } }
      );
      toast.success("Job posted successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post the job. Please try again.");
    }
  };

  const addRequirement = () => {
    if (requirementInput) {
      setRequirements([...requirements, requirementInput]);
      setRequirementInput("");
    }
  };

  const addSkill = () => {
    if (skillsInput) {
      setSkills([...skills, skillsInput]);
      setSkillsInput("");
    }
  };

  const addResponsibility = () => {
    if (responsibilityInput) {
      setResponsibilities([...responsibilities, responsibilityInput]);
      setResponsibilityInput("");
    }
  };

  const handleOnClick= () => {
    navigate(`/employer/jobPost`)
  }

  return (
    <Card className="max-w-3xl mx-auto p-4">
      <CardHeader>
        <CardTitle><div className="flex justify-between items-center">

          <h2>Create Job Post</h2>
          <Button onClick={handleOnClick}>back to employer</Button>

        </div>
          </CardTitle>

      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Senior Full Stack Developer"
                    />
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
                    <Textarea
                      {...field}
                      placeholder="Job description here..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter a requirement"
                          value={requirementInput}
                          onChange={(e) => setRequirementInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addRequirement();
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            addRequirement();
                            field.onChange([...field.value, requirementInput]); // Update form state
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((req, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                            >
                              {req}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedRequirements =
                                    field.value.filter((_, i) => i !== index);
                                  field.onChange(updatedRequirements); // Update form state
                                }}
                                className="ml-2 text-red-600"
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Skills Required */}
            <FormField
              control={form.control}
              name="skillsRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Required</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter a skill"
                          value={skillsInput}
                          onChange={(e) => setSkillsInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            addSkill();
                            field.onChange([...field.value, skillsInput]); // Update form state
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                            >
                              {skill}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedSkills = field.value.filter(
                                    (_, i) => i !== index
                                  );
                                  field.onChange(updatedSkills); // Update form state
                                }}
                                className="ml-2 text-red-600"
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Responsibilities */}
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter a responsibility"
                          value={responsibilityInput}
                          onChange={(e) =>
                            setResponsibilityInput(e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addResponsibility();
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            addResponsibility();
                            field.onChange([
                              ...field.value,
                              responsibilityInput,
                            ]); // Update form state
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((resp, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                            >
                              {resp}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedResponsibilities =
                                    field.value.filter((_, i) => i !== index);
                                  field.onChange(updatedResponsibilities); // Update form state
                                }}
                                className="ml-2 text-red-600"
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Application Deadline */}
            <FormField
              name="applicationDeadline"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
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
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="San Francisco, CA" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
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
          /> */}

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
                      defaultValue={field.value}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            <div className="flex w-full justify-end  gap-5">
              <Button
                type="submit"
                className=""
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                Submit
              </Button>
              <Button
                className="bg-secondary-foreground text-white"
                disabled={!form.formState.isValid}
                onClick={() => resetForm()}
                type="button"
              >
                Clear
              </Button>
            </div>
            {/* {Object.keys(form.formState.errors).length > 0 && (
              <div className="text-red-500 mt-2">
                <h3>Invalid Fields:</h3>
                <ul>
                  {Object.entries(form.formState.errors).map(
                    ([field, error]) => (
                      <li key={field}>
                        <strong>{field}:</strong> {error.message}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )} */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
