"use client";

import React from "react";
import Button from "./Button";
import { Table } from "antd";
import useSwr from "swr";
import DotLoader from "./DotLoader";
import { toast } from "react-hot-toast";
import EditCell from "./EditableCell";
import axios from "axios";

const fetcher = async (...args) => {
  const res = await axios.get(...args);
  return res.data;
};

export default function EditableTable({ displayFormModal }) {
  const { data, isLoading, error, mutate } = useSwr("/api/users", fetcher);

  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}/`, {
        method: "DELETE",
      });
      mutate();
      toast.success("Deleted user ", { duration: 2000 });
    } catch (err) {
      toast.error("Error occured " + error.message, { duration: 2000 });
      console.log(err);
    }
  };

  if (isLoading) return <DotLoader />;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, record) => {
        return <EditCell value={val} record={record} name='name' />;
      },
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
      render: (val, record) => {
        return <EditCell value={val} record={record} name='salary' />;
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      filters: [
        {
          text: "HR",
          value: "hr",
        },
        {
          text: "Developer",
          value: "dev",
        },
        {
          text: "Manager",
          value: "manager",
        },
      ],

      onFilter: (value, record) => record.designation === value,
      render: (value, record) => {
        return (
          <EditCell
            value={value}
            record={record}
            name='designation'
            type={"select"}
            options={["HR", "Manager"]}
          />
        );
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",

      render: (val, record) => {
        const date = new Date(Number(val)).toLocaleDateString();
        return (
          <EditCell
            value={date}
            record={record}
            name='startDate'
            type={"date"}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record, value) => {
        return (
          <div>
            <Button
              clickHandler={() => deleteUser(record.id)}
              varaint={"danger"}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        title={() => (
          <div className='flex justify-center font-bold text-3xl '>
            User data
          </div>
        )}
        className='w-full'
        columns={columns}
        bordered
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
      />
      <div className='flex w-full justify-end'>
        <Button
          clickHandler={() => {
            displayFormModal();
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}
