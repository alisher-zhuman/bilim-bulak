"use client";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const Dashboard = () => {
  const { isAuthed } = useRequireAuth();

  if (!isAuthed) return null;

  return <h1>Hi</h1>;
};

export default Dashboard;
