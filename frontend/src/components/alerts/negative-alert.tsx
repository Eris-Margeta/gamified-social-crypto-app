// Displays an alert message for errors, supporting multiple error messages.

// Uses Heroicons for visual representation of the alert state.

import { XCircleIcon } from "@heroicons/react/20/solid";

interface NegativeAlertProps {
	errors: string[];
}

export const NegativeAlert = (props: NegativeAlertProps) => {
	return (
		<div className="rounded-md bg-red-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-red-800">
						{props.errors.length === 1
							? "There was an error with your submission"
							: `There were ${props.errors.length} errors with your submission`}
					</h3>
					<div className="mt-2 text-sm text-red-700">
						<ul role="list" className="list-disc space-y-1 pl-5">
							{props.errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
