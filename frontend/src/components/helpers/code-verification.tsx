import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";

interface CodeVerificationProps {
	email: string;
}

export const CodeVerification = ({ email }: CodeVerificationProps) => {
	const [code, setCode] = useState<string[]>(Array(6).fill(""));
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { setSessionID } = useSession();
	const { toast } = useToast();

	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value, name } = event.target;

		if (name === "delete") {
			setCode(Array(6).fill(""));
			inputRefs.current[0]?.focus();
			return;
		}

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Backspace" || event.key === "Delete") {
			setCode(Array(6).fill(""));
			inputRefs.current[0]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").slice(0, 6);
		const newCode = pasteData.split("");
		setCode([...newCode, ...Array(6 - newCode.length).fill("")]);

		const nextIndex = newCode.length < 6 ? newCode.length : 5;
		inputRefs.current[nextIndex]?.focus();
	};

	const handleVerifyCode = async () => {
    const fullCode = code.join("");
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/api/verify-code`,
            { email, code: fullCode },
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            }
        );

        if (response.data.sessionID) {
            Cookies.set("sessionID", response.data.sessionID, { expires: 365 });
            setSessionID(response.data.sessionID);
            toast({
                title: "Verification Successful",
                description: "You are now logged in.",
            });
            
            setTimeout(() => {
                window.location.reload();
            }, 500); 
        } else {
            toast({
                title: "Verification Failed",
                description: "Wrong code, try again.",
                variant: "destructive",
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        toast({
            title: "Verification Error",
            description: "An error occurred during verification. Please try again.",
            variant: "destructive",
        });
    }
};


	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			<div className="flex space-x-2">
				{code.map((digit, index) => (
					<Input
						key={index}
						type="text"
						maxLength={1}
						value={digit}
						onChange={(e) => handleInputChange(e, index)}
						onKeyDown={handleKeyDown}
						onPaste={handlePaste}
						ref={(el) => (inputRefs.current[index] = el)}
						className="w-12 h-12 text-center"
						style={{
							minWidth: "2rem",
							maxWidth: "2.5rem",
							minHeight: "2rem",
							maxHeight: "2.5rem",
						}}
					/>
				))}
			</div>
			<Button onClick={handleVerifyCode} className="mt-4">
				Verify Code
			</Button>
		</div>
	);
};
