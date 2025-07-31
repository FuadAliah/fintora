"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Routes } from "@/utils/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="w-32 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <Image
                src={session?.user?.image ?? ""}
                alt={session.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 p-1 mt-2 bg-white rounded-md"
            align="end"
          >
            <div className="px-2 pt-2">
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-sm text-gray-600">
                {session.user?.email}
              </DropdownMenuLabel>
            </div>
            <DropdownMenuGroup className="mt-2 flex flex-col text-sm w-full">
              <DropdownMenuItem asChild className="w-full hover:bg-gray-50 p-2">
                <Link className="w-full" href="/settings">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="w-full hover:bg-gray-50 p-2">
                <Link className="w-full" href="/settings">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2"
                onSelect={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/" });
                }}
              >
                <Button
                  className="w-full"
                  size="sm"
                  variant="destructive"
                  type="button"
                >
                  <LogOutIcon />
                  <span>Sign out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Button variant="link" size="sm" onClick={() => router.push(Routes.LOGIN)}>
      Sign in
    </Button>
  );
}
