import React from "react";
import Button from "./Button";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "@/schemas/userSchema";

export default function UserFormModal({ hideFormModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const addNewUser = async (formData) => {
    const newUser = {
      name: formData.name,
      designation: formData.designation,
      salary: formData.salary,
      startDate: formData.startDate.getTime(),
    };
    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      mutate("/api/users");
      toast.success("Added new user", { duration: 2000 });
    } catch (err) {
      toast.error("Error occured " + err?.message, { duration: 2000 });
      console.log(err);
    }
  };

  const submitHandler = async (formData) => {
    await addNewUser(formData);
    hideFormModal();
  };

  return (
    <div className='modal-bg'>
      <div className='form-container'>
        <h3 className='text-3xl font-extrabold'>Add User</h3>
        <form
          className='flex flex-col gap-4  justify-evenly h-full '
          onSubmit={handleSubmit(submitHandler)}
        >
          <label htmlFor='name'>Name</label>
          <div className='relative  w-full mb-5 group'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter name'
              {...register("name")}
            />
            {errors.name && (
              <span className='text-red-500 ml-2'>{errors.name.message}</span>
            )}
          </div>
          <label htmlFor='salary'>Salary</label>
          <div className='relative  w-full mb-5 group'>
            <input
              type='number'
              name='salary'
              id='salary'
              placeholder='Enter salary '
              {...register("salary", { valueAsNumber: true })}
            />
            {errors.salary && (
              <span className='text-red-500 ml-2'>{errors.salary.message}</span>
            )}
          </div>
          <label htmlFor='startDate'> Start Date</label>
          <div className='relative  w-full mb-5 group'>
            <input
              type='date'
              name='startDate'
              id='startDate'
              placeholder='Enter salary '
              {...register("startDate", { valueAsDate: true })}
            />
            {errors.startDate && (
              <span className='text-red-500 ml-2'>
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div className='relative flex flex-col gap-2 w-full mb-5 group'>
            <label htmlFor='designation'>Designation</label>
            <select
              name='designation'
              className='mt-3 h-9 p-2'
              id='designation'
              {...register("designation")}
            >
              <option value='' disabled>
                Select
              </option>
              <option value='manager'>Manager</option>
              <option value='hr'>HR</option>
              <option value='dev'>Developer</option>
            </select>
            {errors.designation && (
              <span className='text-red-500 ml-2'>
                {errors.designation.message}
              </span>
            )}
          </div>
          <section className='flex gap-2'>
            <Button type='submit'>ok</Button>
            <Button clickHandler={hideFormModal} varaint={"danger"}>
              Cancel
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}
