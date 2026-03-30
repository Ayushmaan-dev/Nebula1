"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImage } from "@/lib/actions/image.actions";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="h-8 px-3 text-sm bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-all"
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#1f1f1f]/90 border border-gray-700 backdrop-blur-md rounded-xl text-gray-200 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl font-bold">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This will{" "}
            <span className="text-red-400 font-medium">permanently</span> delete
            the image and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <AlertDialogCancel className="w-full sm:w-auto border border-gray-600 text-gray-300 hover:text-white hover:border-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold transition-all"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
