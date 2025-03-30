import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    initializeTimer, 
    decrementTimer 
} from '../features/exam/examSlice';

export const useExamTimer = (duration) => {
    const dispatch = useDispatch();
    const { timeLeft, isTimerRunning } = useSelector(state => state.exams);

    useEffect(() => {
        // Khởi tạo timer chỉ khi chưa có timeLeft
        if (duration && !timeLeft) {
            const totalSeconds = duration * 60;
            dispatch(initializeTimer(totalSeconds));
        }

        // Tạo interval để đếm ngược
        const intervalId = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);

        // Cleanup khi component unmount
        return () => clearInterval(intervalId);
    }, [dispatch, duration, timeLeft]);

    // Format time as HH:MM:SS
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        isTimerRunning,
        formattedTime: formatTime(timeLeft)
    };
};