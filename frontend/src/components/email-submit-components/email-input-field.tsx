// simple email input react comopnent

import { ChangeEvent } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";

interface EmailInputFieldProps {
	email: string;
	onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInputField = ({
	email,
	onEmailChange,
}: EmailInputFieldProps) => {
	return (
		<Field>
			<Label htmlFor="email">Email</Label>
			<Input
				type="email"
				id="email"
				placeholder="Email"
				value={email}
				onChange={onEmailChange}
			/>
		</Field>
	);
};
