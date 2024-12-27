import { useFormStatus } from "react-dom";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function SubmitButton({
  loading,
  btnText,
}: {
  loading: boolean;
  btnText: string;
}) {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {btnText}
    </Button>
  );
}
