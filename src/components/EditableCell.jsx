"use client";

import React, { useState } from "react";
import {
  convertDateInputToUTC,
  convertUTCToDateInputString,
} from "../utils/date";
import { mutate } from "swr";

import { toast } from "react-hot-toast";
import userSchema from "@/schemas/userSchema";

export default function EditCell({ value, record, type, name, ...props }) {
  const [inputVal, setInputVal] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleDateChange = async (e) => {
    try {
      await userSchema.validate(
        { ...record, [name]: e.target.value },
        { abortEarly: false }
      );
    } catch (err) {
      let errs = "";
      err.errors.map((error) => {
        errs += error + "\n";
      });
      toast.error("Wrong input\n" + errs);
      return;
    }
    const utcDate = new Date(e.target.value).getTime();
    try {
      await fetch(`/api/users/${record.id}`, {
        method: "PATCH",
        body: JSON.stringify({ [name]: utcDate }),
      });
      mutate("/api/users");
      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setIsEdit(false);
    }

    setTimeout(() => {
      setIsEdit(false);
    }, 1000);
  };

  const handleDblClick = () => {
    setIsEdit(true);
  };
  const handleValueUpdate = async (e) => {
    if (e.key === "Enter") {
      const fromattedDate = convertUTCToDateInputString(
        Number(record.startDate)
      );
      try {
        await userSchema.validate(
          { ...record, [name]: e.target.value, startDate: fromattedDate },
          { abortEarly: false }
        );
      } catch (err) {
        let errs = "";
        err?.errors?.map((error) => {
          errs += error + "\n";
        });
        toast.error("Wrong input\n" + errs);
        return;
      }
      try {
        await fetch(`/api/users/${record.id}`, {
          method: "PATCH",
          body: JSON.stringify({ [name]: e.target.value }),
        });
        mutate("/api/users");
        toast.success("Updated successfully");
      } catch (err) {
        toast.error("Failed to update");
      } finally {
        setIsEdit(false);
      }
    }
  };
  let inputElement = "";
  switch (type) {
    case "text":
      inputElement = (
        <input onChange={handleChange} onKeyDown={handleValueUpdate} />
      );
      break;
    case "select":
      inputElement = (
        <select
          className='h-8 px-2'
          onChange={(e) => handleValueUpdate({ ...e, key: "Enter" })}
        >
          <option disabled selected>
            Select
          </option>
          {props.options.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      );
      break;
    case "date":
      inputElement = (
        <div>
          <input type='date' onChange={handleDateChange} />
        </div>
      );
      break;

    default:
      inputElement = (
        <input
          className='border-[1px] border-gray-400 '
          onChange={handleChange}
          onKeyDown={handleValueUpdate}
        />
      );
  }

  if (!isEdit) {
    return (
      <div className='' onDoubleClick={handleDblClick}>
        {value}
      </div>
    );
  }
  return <div className='w-1/2'>{inputElement}</div>;
}
