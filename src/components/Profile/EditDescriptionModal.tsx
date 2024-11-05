"use client"

import React, { useState, useEffect } from "react"
import { IoPencil } from "react-icons/io5"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useUserStore } from "@/store"
import { envConfig } from "@/config/envConfig"

interface EditDescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (newDescription: string) => void
}

export const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [description, setDescription] = useState("")
  const { user } = useUserStore()

  const handleUpdateClick = async () => {
    if (!user || !user.walletAddress) {
      console.error("User wallet address is not available")
      return
    }

    try {
      const response = await fetch(`${envConfig.BACKEND_URL}/user/update-description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: user.walletAddress,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update description")
      }

      const data = await response.json()
      onUpdate(data.data.description)
      toast({ title: "Updated description successfully" })
      onClose()
    } catch (error) {
      console.error("Error updating description:", error)
      toast({ title: "Error updating description", variant: "destructive" })
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
      setDescription("");  // Reset newPrice when the modal opens
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#160041] font-semibold text-center text-xl mb-4">Edit Description</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription className="block text-gray-700 text-sm font-medium mb-2">
          Description
        </DialogDescription>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description here..."
          className="w-full h-32 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleUpdateClick}
          className="gradient-button hover:cursor-pointer mt-4 w-full py-2 text-white rounded transition duration-150"
        >
          Update
        </button>
      </DialogContent>
    </Dialog>
  )
}
