import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function AdminLogin() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // If already authenticated, redirect to admin blog
  useEffect(() => {
    if (user && !loading) {
      setLocation("/admin/blog");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Checking authentication status...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>
            Sign in to access the blog management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You need to be authenticated to access the admin dashboard. Click the button below to sign in with your Manus account.
          </p>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="w-full"
            size="lg"
          >
            Sign In with Manus
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to the Manus login portal. After authentication, you'll be returned to the admin dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
