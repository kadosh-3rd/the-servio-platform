import { useFormStatus } from "react-dom";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function SubmitButton({ btnText }: { btnText: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
      {btnText}
    </Button>
  );
}
