import { AppDispatch } from 'common/types/types';
import { useDispatch } from 'react-redux';

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
