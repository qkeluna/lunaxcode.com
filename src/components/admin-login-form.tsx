"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.message || "Google sign-in failed");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Google sign-in failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  Lunaxcode
                </div>
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <p className="text-muted-foreground text-balance">
                  Sign in to access the admin dashboard
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@lunaxcode.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-muted-foreground"
                    onClick={() => alert("Please contact admin@lunaxcode.com for password reset")}
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Sign in with Google
              </Button>
              <div className="text-center text-sm">
                Need an account?{" "}
                <a href="mailto:admin@lunaxcode.com" className="underline underline-offset-4">
                  Contact Admin
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-4xl font-bold mb-4">⚡</div>
                <h2 className="text-2xl font-bold mb-2">Speed & Excellence</h2>
                <p className="text-blue-100">
                  Managing projects at the speed of light
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By signing in, you agree to our{" "}
        <button className="underline underline-offset-4 text-muted-foreground hover:text-foreground">
          Terms of Service
        </button>{" "}
        and{" "}
        <button className="underline underline-offset-4 text-muted-foreground hover:text-foreground">
          Privacy Policy
        </button>.
      </div>
    </div>
  );
}