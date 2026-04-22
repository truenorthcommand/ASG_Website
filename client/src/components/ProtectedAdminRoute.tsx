import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedAdminRoute: Wraps admin pages to ensure:
 * 1. User is authenticated (redirects to /admin/login if not)
 * 2. User has admin role (shows access denied if not admin)
 * 3. Shows loading state while checking auth
 */
export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  // Show loading state
  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="container py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Access Denied</h3>
                <p className="text-sm text-red-800">
                  Only administrators can access this page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render children if authenticated and admin
  return <>{children}</>;
}
