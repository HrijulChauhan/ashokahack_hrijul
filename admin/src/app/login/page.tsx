"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

// Mock credentials for display
const SAMPLE_CREDENTIALS = {
    email: "admin@bakersoven.in",
    password: "spare123"
};

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, authLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            router.push("/");
        } else {
            setError(result.error || "Login failed");
        }
        setLoading(false);
    };

    const fillCredentials = () => {
        setEmail(SAMPLE_CREDENTIALS.email);
        setPassword(SAMPLE_CREDENTIALS.password);
    };

    // Show nothing while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-spare-bg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    // Don't render if already authenticated (will redirect)
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-spare-bg flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <img src="/logo.svg" alt="Spare" className="w-12 h-12" />
                    </div>
                    {/* App name in sans, accent */}
                    <h1 className="text-3xl font-bold text-accent">Spare</h1>
                    {/* Restaurant in pink */}
                    <p className="text-lg text-pink mt-1">Baker&apos;s Oven</p>
                </div>

                <Card className="bg-spare-bg-light/80 backdrop-blur-sm border-white/10">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-xl text-white">Sign In</CardTitle>
                        <CardDescription>Enter your credentials to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@restaurant.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-spare-bg border-white/10 text-white placeholder:text-muted-foreground focus:border-pink focus:ring-pink/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-spare-bg border-white/10 text-white placeholder:text-muted-foreground pr-10 focus:border-pink focus:ring-pink/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-pink hover:bg-pink-hover text-spare-bg font-semibold h-11"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-spare-bg/30 border-t-spare-bg rounded-full animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        Sign In
                                    </span>
                                )}
                            </Button>
                        </form>

                        {/* Sample Credentials */}
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <button
                                onClick={() => setShowCredentials(!showCredentials)}
                                className="flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-white transition-colors"
                            >
                                {showCredentials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                View sample credentials
                            </button>

                            {showCredentials && (
                                <div className="mt-3 p-3 rounded-lg bg-spare-bg/50 border border-pink/20">
                                    <div className="text-xs space-y-1 text-muted-foreground">
                                        <p><span className="text-pink">Email:</span> {SAMPLE_CREDENTIALS.email}</p>
                                        <p><span className="text-pink">Password:</span> {SAMPLE_CREDENTIALS.password}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={fillCredentials}
                                        className="w-full mt-2 border-pink/30 text-pink hover:bg-pink/10 hover:text-pink text-xs"
                                    >
                                        Fill credentials
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground font-serif italic mt-6">
                    Powered by <span className="text-accent font-sans font-medium not-italic">Spare</span> • Food Rescue Marketplace
                </p>
            </div>
        </div>
    );
}
