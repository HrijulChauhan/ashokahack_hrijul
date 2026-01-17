"use client";

import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-spare-bg/80 backdrop-blur-sm sticky top-0 z-40">
            <div>
                {/* Label in serif, muted */}
                {subtitle && (
                    <p className="text-sm text-muted-foreground font-serif">{subtitle}</p>
                )}
                {/* Title in sans, pink */}
                <h1 className="text-xl font-semibold text-pink">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/5">
                            <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center">
                                <User className="w-4 h-4 text-spare-bg" />
                            </div>
                            <span className="text-sm font-medium hidden sm:block">
                                {user?.name || "Admin"}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-spare-bg-light border-white/10">
                        <DropdownMenuLabel className="text-white">
                            {user?.email || "My Account"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                            className="text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer"
                            onClick={() => router.push("/settings")}
                        >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                            className="text-destructive hover:bg-destructive/10 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
