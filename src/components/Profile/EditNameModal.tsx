"use client"

import React, { useState, useEffect } from "react"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useUserStore } from "@/store"
import { envConfig } from "@/config/envConfig"

interface EditNameModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (newName: string) => void
}

export const EditNameModal: React.FC<EditNameModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState("")
  const { user } = useUserStore()

  const handleUpdateClick = async () => {
    if (!user || !user.walletAddress) {
      console.error("User wallet address is not available")
      return
    }

    try {
      const response = await fetch(`${envConfig.BACKEND_URL}/user/update-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: user.walletAddress,
          name,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update name")
      }

      const data = await response.json()
      onUpdate(data.data.name)
      toast({ title: "Updated name successfully" })
      onClose()
    } catch (error) {
      console.error("Error updating name:", error)
      toast({ title: "Error updating name", variant: "destructive" })
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
      setName("");  // Reset newPrice when the modal opens
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
          <DialogTitle className="text-[#160041] font-semibold text-center text-xl mb-4">Edit Name</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <textarea
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your name here..."
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
