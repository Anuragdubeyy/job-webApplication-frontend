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

export default function JobApplyPage() {
  // Mock applicant data
  const { id } = useParams();
  // const dispatch = useAppDispatch();
  // const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills((prev) => [...prev, inputValue.trim()]); // Add unique skill
      form.setValue("skills", [...skills, inputValue.trim()]); // Update form state
      setInputValue(""); // Clear input
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills); // Update form state
  };
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
      resume: null,
      coverLetter: "",
      experience: [],
    },
  });
  const resetForm = () => {
    // setImagePreview(null);

    form.reset();
  };
  // Submit handler
  const onSubmit = async (data: ApplicationInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("experience_year", data.experience_year?.toString() || "");
    formData.append(
      "currently_working",
      data.currently_working ? "true" : "false"
    );
    if (data.experience)
      formData.append("experience", JSON.stringify(data.experience));
    if (data.notice_period)
      formData.append("notice_period", data.notice_period);
    if (data.linkedIn_link)
      formData.append("linkedIn_link", data.linkedIn_link);
    if (data.portfolio) formData.append("portfolio", data.portfolio);
    if (data.current_salary)
      formData.append("current_salary", data.current_salary);
    if (data.expected_salary)
      formData.append("expected_salary", data.expected_salary);
    if (data.skills) formData.append("skills", data.skills.join(","));
    if (data.resume) formData.append("resume", data.resume);
    if (data.coverLetter) formData.append("coverLetter", data.coverLetter);

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

  const [experience, setExperience] = useState<ApplicationInput["experience"]>(
    []
  );
  const [newExperience, setNewExperience] = useState({
    company_name: "",
    job_title: "",
    joining_date: "",
    end_date: "",
    currently_working: false,
    description: "",
    city: "",
  });

  // Add Experience Handler
  const addExperience = () => {
    if (newExperience.company_name.trim()) {
      setExperience((prev) => [...prev, newExperience]);
      form.setValue("experience", [...experience, newExperience]); // Update form state
      setNewExperience({
        company_name: "",
        job_title: "",
        joining_date: "",
        end_date: "",
        currently_working: false,
        description: "",
        city: "",
      }); // Reset new experience fields
    }
  };

  // Remove Experience Handler
  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    form.setValue("experience", updatedExperience); // Update form state
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-4">
        <Link to="/jobs">
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
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)} // Convert to boolean
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)} // Convert to boolean
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
                        {experience.map((exp: any, index) => (
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
                              {exp.currently_working ? "Present" : exp.end_date}
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
                          />
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
                          <Button onClick={addExperience}>
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
                  disabled={!form.formState.isValid}
                  type="submit"
                >
                  Save
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
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
