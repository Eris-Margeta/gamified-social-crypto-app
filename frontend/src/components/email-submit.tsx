import { FormEvent, useState } from "react";
import { Button } from "@/components/catalyst/button";
import { EmailInputField } from "@/components/email-submit-components/email-input-field";
import { useEmailSubmission } from "@/hooks/form-submission-logic";
import { WaitingForVerification } from "@/components/waiting-for-verification";

export const EmailSubmitForm = ({ onSetErrors }: { onSetErrors: (errors: string[]) => void }) => {
  // Set userIP to a fixed value instead of fetching it
  const [userIP] = useState<string>("1.1.1.1");

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { email, setEmail, sendEmailData } = useEmailSubmission(
    onSetErrors,
    () => setEmailSubmitted(true)
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Use the fixed userIP value in sendEmailData
    sendEmailData(window.location.href, email, userIP);
  };

  if (emailSubmitted) {
    return <WaitingForVerification email={email} />;
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm px-12 py-12 flex-row rounded-xl shadow-xl fade-in-form" style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -33%)", width: "100%", maxWidth: "600px" }}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <EmailInputField email={email} onEmailChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
