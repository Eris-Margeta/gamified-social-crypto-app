// A custom hook for managing error states and visibility within components.

// Manages visibility of alerts and actions through local state.

import { useState, useEffect } from "react";

export const useErrorHandling = (initialErrors: string[]) => {
	const [errors, setErrors] = useState<string[]>(initialErrors);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (errors.length > 0) {
			setIsVisible(true);
			const timer = setTimeout(() => {
				setIsVisible(false);
				const removeTimer = setTimeout(() => setErrors([]), 500);
				return () => clearTimeout(removeTimer);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	return { errors, setErrors, isVisible };
};
