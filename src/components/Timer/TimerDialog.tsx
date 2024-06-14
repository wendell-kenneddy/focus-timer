import { FormEvent, ReactNode, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";

interface TimerDialogProps {
  children: ReactNode;
  isModalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (newDuration: number) => void;
}

type InputRef = HTMLInputElement | null;

export function TimerDialog({ children, onSubmit, isModalOpen, onOpenChange }: TimerDialogProps) {
  const minutesInputRef = useRef<InputRef>(document.getElementById("minutes") as InputRef);
  const secondsInputRef = useRef<InputRef>(document.getElementById("seconds") as InputRef);

  function validateNumberInputValue(texet: string) {
    return texet.match(/^[0-9]+$/);
  }

  function getDurationInputValue(type: "minutes" | "seconds") {
    const input = type == "minutes" ? minutesInputRef : secondsInputRef;
    if (!input.current || !input.current.value) return 0;
    const duration = input.current.value;
    const isValidDuration = validateNumberInputValue(duration);
    return isValidDuration ? Number(duration) : `Invalid ${type} duration.`;
  }

  function resetInputs() {
    const minutesInput = minutesInputRef.current;
    const secondsInput = minutesInputRef.current;
    minutesInput && (minutesInput.value = "");
    secondsInput && (secondsInput.value = "");
  }

  function handleOpenChange(open: boolean, formSubmitted?: boolean) {
    if (!formSubmitted) return onOpenChange(open);

    const minutesValue = getDurationInputValue("minutes");
    const secondsValue = getDurationInputValue("seconds");

    if (typeof minutesValue == "string") return alert(minutesValue);
    if (typeof secondsValue == "string") return alert(secondsValue);

    const totalTimeInMilliseconds = minutesValue * 1000 * 60 + secondsValue * 1000;
    resetInputs();
    onSubmit(totalTimeInMilliseconds);
    onOpenChange(open);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleOpenChange(false, true);
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0000004d] w-screen h-screen" />

        <Dialog.Content className="bg-surface-black p-4 shadow-lg text-white w-[90%] max-w-[300px] max-h-[500px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="font-bold text-xl mb-2">Edit timer duration</Dialog.Title>

          <Dialog.Description className="mb-8 text-xs">
            Adjust the timer duration in minutes and seconds. Click save when you're done.
          </Dialog.Description>

          <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="flex items-center gap-1 justify-center mb-8">
              <label htmlFor="minutes" className="sr-only">
                Minutes
              </label>
              <input
                ref={minutesInputRef}
                placeholder="24"
                type="number"
                id="new-duration"
                name="new-duration"
                className="text-center w-20 appearance-none flex items-center justify-center bg-neutral-900 rounded-[4px] py-1 px-4 text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none"
              />

              {":"}

              <label htmlFor="seconds" className="sr-only">
                Seconds
              </label>
              <input
                ref={secondsInputRef}
                placeholder="59"
                type="number"
                id="seconds"
                name="seconds"
                className="text-center w-20 appearance-none flex items-center justify-center bg-neutral-900 rounded-[4px] py-1 px-4 text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none"
              />
            </div>

            <button className="w-full rounded-md font-bold py-2 bg-vibrant-blue transition-colors bg-opacity-75 hover:bg-opacity-90 flex items-center justify-center">
              Save
            </button>
          </form>

          <Dialog.Close asChild className="absolute top-5 right-4">
            <button name="Close dialog">
              <X color="#42d3ff" size={16} weight="regular" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
