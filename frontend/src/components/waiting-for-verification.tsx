import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/catalyst/button";
import animationData from "@/assets/moon1.json";
import { CodeVerification } from "./helpers/code-verification";

interface WaitingForVerificationProps {
  email: string;
}

export const WaitingForVerification = ({ email }: WaitingForVerificationProps) => {
  const { toast } = useToast();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="bg-zinc-900 px-12 py-12 flex flex-col items-center justify-center rounded-xl shadow-xl text-white"
      style={{
        position: "absolute",
        top: "33%",
        left: "50%",
        transform: "translate(-50%, -33%)",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <Lottie options={defaultOptions} height={150} width={150} />
      <h2 className="text-lg font-semibold mb-4">Verification Pending</h2>
      <p className="mb-6">
        Code from email:
      </p>
   
      <CodeVerification email={email} />
       
      {showButton && (
        <>
        <p className="p-6">
        <i>Email didn't arrive?</i>
      </p>
        <Button
          onClick={() => {
            toast({
              title: "Email Sent!",
              description: "Please check your spam folder or try again later",
            });
          }}
        >
          Resend Email
        </Button>
        </>
      )}
     
    </div>
  );
};
