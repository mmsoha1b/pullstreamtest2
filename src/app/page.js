"use client";
import EditableTable from "@/components/EditableTable";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import UserFormModal from "@/components/UserFormModal";

export default function Home() {
  const [userModalVisible, setUserModalVisible] = useState(null);
  const displayFormModal = () => {
    setUserModalVisible(true);
  };
  const hideFormModal = () => {
    setUserModalVisible(false);
  };
  return (
    <>
      <Toaster />
      <main className='flex flex-col p-16 w-full  items-center  gap-2 '>
        <EditableTable displayFormModal={displayFormModal} />
      </main>
      {userModalVisible && <UserFormModal hideFormModal={hideFormModal} />}
    </>
  );
}
