import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ApplicationInput,
  ApplicationSchema,
} from "../../schema/applicationSchema";
// import { useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { API_URL } from "../../constant";

export default function JobApplyPage() {
  // Mock applicant data
  const { id } = useParams();
  // const dispatch = useAppDispatch();
  // const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [newExperience, setNewExperience] = useState<any>({
    company_name: "",
    job_title: "",
    joining_date: "",
    end_date: "",
    description: "",
    currently_working: false,
    city: "",
  });
  const form = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      name: "",
      experience_year: 0,
      currently_working: false,
      notice_period: "",
      linkedIn_link: "",
      portfolio: "",
      current_salary: "",
      expected_salary: "",
      skills: [],
      resume: "",
      coverLetter: "",
      experience: [], // Set experience to an empty array initially
    },
  });

  // Function to add skill
  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      const newSkills = [...skills, inputValue.trim()];
      setSkills(newSkills);
      form.setValue("skills", newSkills); // Update form state
      setInputValue(""); // Clear input
    }
  };

  // Function to remove skill
  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills); // Update form state
  };

  // Function to add experience
  const addExperience = () => {
    if (newExperience.company_name.trim()) {
      const updatedExperience = [
        ...form.getValues("experience"),
        newExperience,
      ];
      form.setValue("experience", updatedExperience); // Update form state
      setNewExperience({
        company_name: "",
        job_title: "",
        joining_date: "",
        end_date: "",
        currently_working: false,
        description: "",
        city: "",
      }); // Reset input fields after adding
    }
  };

  // Function to remove experience
  const removeExperience = (index: number) => {
    const updatedExperience = form
      .getValues("experience")
      .filter((exp: any, i: number) => i !== index);
    form.setValue("experience", updatedExperience); // Update form state
  };

  // Submit handler
  const onSubmit = async (data: ApplicationInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("experience_year", data.experience_year.toString());
      formData.append("currently_working", data.currently_working ? "true" : "false");
  
      if (data.notice_period) formData.append("notice_period", data.notice_period);
      if (data.linkedIn_link) formData.append("linkedIn_link", data.linkedIn_link);
      if (data.portfolio) formData.append("portfolio", data.portfolio);
  
      console.log("FormData before submission:", [...formData]);
  
      const response = await axios.post(
        API_URL.POST_APPLY_FOR_JOB(id?.toString() || ""),
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jobToken")}`,
          },
        }
      );
  
      console.log("Server Response:", response.data);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting application:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };
  
  
  
  return (
    <div className="p-6 space-y-8">
      <div className="mb-4">
        <Link to="/jobseeker/jobs">
          <Button>ALL JOB</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Fill out your basic details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Years of Experience */}
              <FormField
                control={form.control}
                name="experience_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value ?? ""}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Currently Working */}
              <FormField
                control={form.control}
                name="currently_working"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currently Working</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            value="true" // Keep as string "true" because it's handled by React Hook Form
                            checked={field.value === true} // Compare with boolean value
                            onChange={() => field.onChange(true)} // Pass boolean true
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            value="false" // Keep as string "false"
                            checked={field.value === false} // Compare with boolean false
                            onChange={() => field.onChange(false)} // Pass boolean false
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Indicate if you are currently working at a job.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notice Period */}
              <FormField
                control={form.control}
                name="notice_period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Period</FormLabel>
                    <FormControl>
                      <Input
                        className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* LinkedIn Link */}
              <FormField
                control={form.control}
                name="linkedIn_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Portfolio */}
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <Input
                        className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Enter a skill"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <Button onClick={addSkill}>Add</Button>
                        </div>
                        {skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                              >
                                {skill}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeSkill(skill)}
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
                    <FormDescription>
                      Add relevant skills by typing and pressing "Enter" or
                      clicking "Add".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={() => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {form
                          .watch("experience")
                          ?.map((exp: any, index: number) => (
                            <div
                              key={index}
                              className="border p-4 rounded-md space-y-2 bg-gray-50"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <strong>{exp.company_name}</strong> -{" "}
                                  {exp.job_title}
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeExperience(index)}
                                  className="text-red-600"
                                >
                                  ✕
                                </Button>
                              </div>
                              <div>
                                {exp.joining_date} to{" "}
                                {exp.currently_working
                                  ? "Present"
                                  : exp.end_date}
                              </div>
                              <div>{exp.description}</div>
                              <div>{exp.city}</div>
                            </div>
                          ))}
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="Company Name"
                            value={newExperience.company_name}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                company_name: e.target.value,
                              })
                            }
                          />
                          <Input
                            type="text"
                            placeholder="Job Title"
                            value={newExperience.job_title}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                job_title: e.target.value,
                              })
                            }
                          />
                          <Input
                            type="date"
                            placeholder="Joining Date"
                            value={newExperience.joining_date}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                joining_date: e.target.value,
                              })
                            }
                          />
                          <Input
                            type="date"
                            placeholder="End Date"
                            value={newExperience.end_date}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                end_date: e.target.value,
                              })
                            }
                            disabled={newExperience.currently_working}
                          />
                          <div className="flex gap-2 items-center">
                            <h2>Currently Working</h2>
                            <Checkbox
                              label="currently_working"
                              checked={newExperience.currently_working}
                              onCheckedChange={(checked) =>
                                setNewExperience({
                                  ...newExperience,
                                  currently_working: !!checked,
                                  end_date: "",
                                })
                              }
                              className="mr-2"
                            />
                          </div>
                          <Textarea
                            placeholder="Description"
                            value={newExperience.description}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                description: e.target.value,
                              })
                            }
                          />
                          <Input
                            type="text"
                            placeholder="City"
                            value={newExperience.city}
                            onChange={(e) =>
                              setNewExperience({
                                ...newExperience,
                                city: e.target.value,
                              })
                            }
                          />
                          <Button
                            onClick={addExperience} // Ensure the button calls addExperience
                            disabled={
                              !newExperience.company_name.trim() ||
                              !newExperience.job_title.trim()
                            }
                          >
                            Add Experience
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add details of your work experience.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Salary */}
              <FormField
                control={form.control}
                name="current_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your current salary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify your current salary in your preferred currency.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expected Salary */}
              <FormField
                control={form.control}
                name="expected_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your expected salary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify your expected salary in your preferred currency.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attach Resume</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file); // Pass the selected file to the form state
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload your resume in PDF, DOC, or DOCX format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attach Cover Letter</FormLabel>
                    <FormControl>
                      <Input
                        ref={coverLetterInputRef} // Attach the ref for resetting
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file); // Pass the selected file to the form state
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload your cover letter in PDF, DOC, or DOCX format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Write your cover letter here..."
                      />
                    </FormControl>
                    <FormDescription>
                      You can write your cover letter here if you haven't
                      uploaded a file.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex items-center gap-5">
                <Button
                  className="bg-primary text-white"
                  // disabled={
                  //   !form.formState.isValid || form.formState.isSubmitting
                  // }
                  type="submit"
                  title={
                    !form.formState.isValid
                      ? "Complete all required fields"
                      : ""
                  }
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  className="bg-secondary-foreground text-white"
                  disabled={!form.formState.isValid}
                  onClick={() => resetForm()}
                  type="button"
                >
                  Clear
                </Button>
                {Object.keys(form.formState.errors).length > 0 && (
                  <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
                    <h3 className="font-bold mb-1">Fix these errors:</h3>
                    <ul className="list-disc pl-5">
                      {Object.entries(form.formState.errors).map(
                        ([field, error]) => (
                          <li key={field}>
                            <span className="capitalize font-medium">
                              {field}:
                            </span>{" "}
                            {error.message}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
