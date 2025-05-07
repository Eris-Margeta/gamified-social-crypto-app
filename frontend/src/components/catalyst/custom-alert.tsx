import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "@/components/catalyst/button";

export interface AlertProps {
	open: boolean;
	onClose: () => void;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
	className?: string;
	children: React.ReactNode;
}

export interface AlertActionsProps {
	onClose?: () => void;
	onConfirm?: () => void;
}

const sizes = {
	xs: "max-w-xs",
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl",
};

export const Alert = ({
	open,
	onClose,
	size = "md",
	className,
	children,
}: AlertProps) => (
	<Transition show={open} as={React.Fragment}>
		<Dialog as="div" className="relative z-50" onClose={onClose}>
			<Transition.Child
				as={React.Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black bg-opacity-25" />
			</Transition.Child>

			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel
							className={clsx(
								"w-full",
								sizes[size],
								"transform overflow-hidden rounded-2xl bg-white text-black hover:text-black p-6 text-left align-middle shadow-xl transition-all",
								"ring-1 ring-black ring-opacity-5",
								className
							)}
						>
							{children}
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
);

export const AlertTitle = ({ children }: { children: React.ReactNode }) => (
	<h2 className="text-lg font-medium leading-6 text-gray-900">{children}</h2>
);

export const AlertDescription = ({
	children,
}: {
	children: React.ReactNode;
}) => <p className="mt-2 text-sm text-gray-500">{children}</p>;

export const AlertActions = ({ onClose, onConfirm }: AlertActionsProps) => (
	<div className="mt-4 flex justify-end gap-3">
		{onClose && (
			<Button color="white" onClick={onClose}>
				Cancel
			</Button>
		)}
		{onConfirm && <Button onClick={onConfirm}>OK</Button>}
	</div>
);
