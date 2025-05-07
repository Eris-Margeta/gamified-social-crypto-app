import { ReactNode } from "react";
import {
	AnimatePresence,
	motion,
	PanInfo,
	useDragControls,
} from "framer-motion";


interface CustomDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const drawerVariants = {
	hidden: { y: "100%" },
	visible: { y: 0 },
};

const Drawer = ({ isOpen, onClose, children }: CustomDrawerProps) => {
	const dragControls = useDragControls();

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if (info.offset.y > 50) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className="fixed inset-0 bg-black/30 z-40 "
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onClick={onClose}
					/>
					<motion.div
						className=" overflow-scroll h-min fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-xl "
						variants={drawerVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						drag="y"
						dragConstraints={{ top: 0 }}
						dragElastic={0.1}
						dragControls={dragControls}
						onDragEnd={handleDragEnd}
					>
						<motion.div
							className="overflow-visible mx-auto  h-2 w-[100px] rounded-full bg-neutral-100 dark:bg-neutral-800 cursor-grab "
							onPointerDown={(e) => dragControls.start(e)}
						/>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

const DrawerContent = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

const DrawerClose = ({
	onClick,
	children,
}: {
	onClick: () => void;
	children: ReactNode;
}) => {
	return (
		<a onClick={onClick} className="p-2 overflow-visible">
			{children}
		</a>
	);
};

export { Drawer, DrawerContent, DrawerClose };
