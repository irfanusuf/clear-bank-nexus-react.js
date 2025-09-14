import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForgotPassword } from "@/hooks/api/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
 
  const forgotPassMutation =  useForgotPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    await forgotPassMutation.mutateAsync(email)
    setSent(true)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">ClearBank Nexus</h1>
        </div>

        <Card className="shadow-banking border-0 bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {sent ? "Reset link sent to your email" : "Enter your email to reset password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="banking" className="w-full" disabled={forgotPassMutation.isPending}>
                  {forgotPassMutation.isPending ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">We've sent password reset instructions to {email}</p>
                <Button variant="banking" className="w-full" onClick={() => setSent(false)}>
                  Resend Email
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-primary hover:text-primary-glow inline-flex items-center text-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;