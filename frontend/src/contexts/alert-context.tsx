/* eslint-disable no-mixed-spaces-and-tabs */
import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from "react";
import {
	Alert,
	AlertActions,
	AlertDescription,
	AlertTitle,
} from "@/components/catalyst/custom-alert";

interface AlertContent {
	title: string;
	description: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	autoClose?: boolean;
}

interface AlertContextType {
	showAlert: (
		title: string,
		description: string,
		onConfirm?: () => void,
		onCancel?: () => void,
		autoClose?: boolean
	) => void;
	hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider");
	}
	return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [alertContent, setAlertContent] = useState<AlertContent>({
		title: "",
		description: "",
	});

	const showAlert = useCallback(
		(
			title: string,
			description: string,
			onConfirm = () => {},
			onCancel = () => {},
			autoClose = false
		) => {
			setAlertContent({ title, description, onConfirm, onCancel, autoClose });
			setIsOpen(true);
			if (autoClose) {
				setTimeout(() => {
					setIsOpen(false);
				}, 5000);
			}
		},
		[]
	);

	const hideAlert = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<AlertContext.Provider value={{ showAlert, hideAlert }}>
			{children}
			{isOpen && (
				<Alert open={isOpen} onClose={hideAlert}>
					<AlertTitle>{alertContent.title}</AlertTitle>
					<AlertDescription>{alertContent.description}</AlertDescription>
					<AlertActions
						onClose={
							!alertContent.autoClose
								? () => {
										alertContent.onCancel?.();
										hideAlert();
								  }
								: undefined
						}
						onConfirm={() => {
							alertContent.onConfirm?.();
							hideAlert();
						}}
					/>
				</Alert>
			)}
		</AlertContext.Provider>
	);
};
