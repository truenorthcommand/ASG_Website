import { BlogAdminDashboard } from "@/components/BlogAdminDashboard";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";

export function AdminBlog() {
  return (
    <ProtectedAdminRoute>
      <div className="container py-12">
        <BlogAdminDashboard />
      </div>
    </ProtectedAdminRoute>
  );
}
