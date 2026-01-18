"use client";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const Confirm = () => {
  const { ready, isAuthed } = useRequireAuth();

  if (!ready) return null;
  if (!isAuthed) return null;

  return <div>
    
  </div>;
};

export default Confirm;
