import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconCategoryFilled, IconSearch } from "@tabler/icons-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <>
      <header className="bg-white flex justify-between items-center px-5 gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src="/logo.png" alt="logo" width="80" height="80" />
          </Link>
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <li className="list-none flex items-center gap-1 p-3 bg-slate-300 rounded-full">
                  <IconCategoryFilled />
                  <p>categories</p>
                </li>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="hidden md:block md:w-full md:max-w-[300px]">
          <li className="bg-slate-200 p-2 rounded-full flex items-center">
            <IconSearch stroke={2} />
            <input
              type="text"
              placeholder="search..."
              className="w-full rounded-full p-1 bg-transparent outline-none"
            />
          </li>
        </div>
        <div className="flex items-center gap-4">
          <div className="card">
            {/* <Dialog.Root>
              <Dialog.Trigger>
                <div className="flex items-center">
                  <iconify-icon
                    icon="ant-design:shopping-filled"
                    style="color: black"
                  ></iconify-icon>
                  <p className="font-medium w-8 aspect-square text-center p-1 bg-primary text-white rounded-full"></p>
                </div>
              </Dialog.Trigger>
              <Dialog.Content className="top-0 right-0 h-full max-w-[400px]">
                <Dialog.Header>
                  <Dialog.Title className="bg-primary text-white p-3">
                    my cards
                  </Dialog.Title>
                  <Dialog.Description>
                    <div
                      className="flex items-center gap-4 justify-center md:justify-start mb-4 mt-4"
                      use:lazy
                    >
                      <img
                        src="https:res.cloudinary.com/dfyfnvmtr/image/upload/w_100/e_blur:10000,q_1,f_auto/
                        )}"
                        className="w-[6.375rem] h-[6.375rem] object-cover bg-gray-200 rounded-md"
                      />
                      <div className="flex justify-between">
                        <p className="font-bold"></p>
                        <span className="font-bold cursor-pointer text-red-700">
                          <iconify-icon icon="ic:round-delete"></iconify-icon>
                        </span>
                      </div>
                    </div>
                    <p className="font-bold flex justify-center items-center min-h-[60vh] text-2xl">
                      there's no cart item
                    </p>
                  </Dialog.Description>
                </Dialog.Header>
              </Dialog.Content>
            </Dialog.Root> */}
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="login">
              <Button asChild>
                <Link to="/sign-in">Login</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </header>
    </>
  );
}

export default Header;
