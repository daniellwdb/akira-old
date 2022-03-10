import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/core";
import React, { useRef, useState } from "react";

interface IDeletePresenceProps {
  name: string;
  action: () => Promise<any>;
}

export const DeletePresenceAlert = ({ name, action }: IDeletePresenceProps) => {
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<any>();

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="link" mt={2}>
        Delete entry?
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete presence for {name}?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variantColor="red"
              onClick={async () => {
                onClose();
                await action();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
