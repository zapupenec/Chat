/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';

import { AuthContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);
