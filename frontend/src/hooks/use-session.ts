import { useContext } from 'react';
import { SessionContext } from '../contexts/session-context';

export const useSession = () => useContext(SessionContext);
