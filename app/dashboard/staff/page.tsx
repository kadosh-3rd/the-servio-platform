import { checkPermissions } from "@/lib/auth/checks";

export default async function StaffPage() {
  // Check if user has permission to manage staff
  await checkPermissions(["manage:staff"]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
      {/* Staff management content */}
    </div>
  );
}
