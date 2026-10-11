
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    Avatar,
    CircularProgress,
    Pagination
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoryIcon from '@mui/icons-material/History';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [meetings, setMeetings] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const meetingsPerPage = 5;

    useEffect(() => {
        let isMounted = true;

        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError('');

                const history = await getHistoryOfUser();

                if (isMounted) {
                    setMeetings(Array.isArray(history) ? history : []);
                }
            } catch (err) {
                console.error('History fetch failed:', err);

                if (isMounted) {
                    setError('Unable to load meeting history. Please try again.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchHistory();

        return () => {
            isMounted = false;
        };
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date unavailable';

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return 'Date unavailable';
        }

        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Search meetings by meeting code
    const filteredMeetings = meetings.filter((meeting) =>
        (meeting.meetingCode || '')
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredMeetings.length / meetingsPerPage
    );

    const paginatedMeetings = filteredMeetings.slice(
        (page - 1) * meetingsPerPage,
        page * meetingsPerPage
    );

    // Reset to page 1 when search changes
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f5f7fb',
                color: '#172033',
                pb: 6
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    background:
                        'linear-gradient(135deg, #101a35 0%, #243b70 100%)',
                    color: 'white',
                    px: { xs: 2, md: 6 },
                    py: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    {/* <Avatar
                        sx={{
                            bgcolor: '#536dfe',
                            width: 42,
                            height: 42,
                            borderRadius: 2
                        }}
                    >
                        <VideocamIcon />
                    </Avatar> */}

                    <Box>
                        <Typography variant="h5" fontWeight={800} style={ {cursor:"pointer"}}>
                            Meetly
                        </Typography>

                    </Box>
                </Stack>

                <Button
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/home')}
                    variant="outlined"
                    sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.4)',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.08)'
                        }
                    }}
                >
                    Home
                </Button>
            </Box>

            {/* Main content */}
            <Box
                sx={{
                    maxWidth: 1100,
                    mx: 'auto',
                    px: { xs: 2, md: 4 },
                    pt: 5
                }}
            >
                {/* Page heading */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ mb: 3 }}
                >
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <HistoryIcon
                                sx={{ color: '#536dfe', fontSize: 30 }}
                            />

                            <Typography variant="h4" fontWeight={800}>
                                Meeting History
                            </Typography>
                        </Stack>

                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Find and rejoin your previous meetings.
                        </Typography>
                    </Box>

                    <Chip
                        icon={<VideoCallIcon />}
                        label={`${filteredMeetings.length} ${
                            filteredMeetings.length === 1
                                ? 'meeting'
                                : 'meetings'
                        }`}
                        sx={{
                            bgcolor: '#e8eaff',
                            color: '#3546b5',
                            fontWeight: 700,
                            px: 1,
                            py: 2.2
                        }}
                    />
                </Stack>

                {/* Search */}
                <TextField
                    fullWidth
                    placeholder="Search by meeting code..."
                    value={search}
                    onChange={handleSearchChange}
                    sx={{
                        mb: 3,
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            '& fieldset': {
                                borderColor: '#e1e6f0'
                            },
                            '&:hover fieldset': {
                                borderColor: '#536dfe'
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#7c89a5' }} />
                            </InputAdornment>
                        )
                    }}
                />

                {/* Loading */}
                {loading && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <CircularProgress />

                        <Typography color="text.secondary" sx={{ mt: 2 }}>
                            Loading your meetings...
                        </Typography>
                    </Box>
                )}

                {/* Error */}
                {!loading && error && (
                    <Card sx={{ p: 3, borderRadius: 3 }}>
                        <Typography color="error">
                            {error}
                        </Typography>

                        <Button
                            sx={{ mt: 1 }}
                            onClick={() => window.location.reload()}
                        >
                            Try again
                        </Button>
                    </Card>
                )}

                {/* Empty state */}
                {!loading && !error && filteredMeetings.length === 0 && (
                    <Card
                        sx={{
                            p: { xs: 4, md: 7 },
                            textAlign: 'center',
                            borderRadius: 4,
                            border: '1px solid #e5eaf3',
                            boxShadow:
                                '0 8px 30px rgba(30,50,90,0.04)'
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: '#eef0ff',
                                color: '#536dfe',
                                width: 72,
                                height: 72,
                                mx: 'auto',
                                mb: 2
                            }}
                        >
                            {search ? (
                                <SearchIcon sx={{ fontSize: 35 }} />
                            ) : (
                                <VideocamIcon sx={{ fontSize: 35 }} />
                            )}
                        </Avatar>

                        <Typography variant="h6" fontWeight={700}>
                            {search
                                ? 'No matching meetings'
                                : 'No meetings yet'}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            {search
                                ? 'Try searching with another meeting code.'
                                : 'Your joined meetings will appear here.'}
                        </Typography>

                        {!search && (
                            <Button
                                variant="contained"
                                startIcon={<VideocamIcon />}
                                onClick={() => navigate('/home')}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    bgcolor: '#536dfe'
                                }}
                            >
                                Join a meeting
                            </Button>
                        )}
                    </Card>
                )}

                {/* Meeting cards */}
                {!loading && !error && paginatedMeetings.length > 0 && (
                    <>
                        <Stack spacing={2}>
                            {paginatedMeetings.map((meeting) => (
                                <Card
                                    key={meeting._id}
                                    elevation={0}
                                    sx={{
                                        border: '1px solid #e5eaf3',
                                        borderRadius: 3,
                                        bgcolor: 'white',
                                        transition:
                                            'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow:
                                                '0 12px 28px rgba(30,50,90,0.09)',
                                            borderColor: '#c9d1ff'
                                        }
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: { xs: 2, md: 3 },
                                            '&:last-child': {
                                                pb: { xs: 2, md: 3 }
                                            }
                                        }}
                                    >
                                        <Stack
                                            direction={{
                                                xs: 'column',
                                                sm: 'row'
                                            }}
                                            alignItems={{
                                                xs: 'flex-start',
                                                sm: 'center'
                                            }}
                                            spacing={2}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: 2.5,
                                                    bgcolor: '#edf0ff',
                                                    color: '#536dfe'
                                                }}
                                            >
                                                <VideocamIcon />
                                            </Avatar>

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={750}
                                                    sx={{
                                                        overflowWrap: 'anywhere'
                                                    }}
                                                >
                                                    {meeting.meetingCode}
                                                </Typography>

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                    sx={{ mt: 0.8 }}
                                                >
                                                    <CalendarMonthIcon
                                                        sx={{
                                                            fontSize: 17,
                                                            color: '#8490a8'
                                                        }}
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {formatDate(meeting.date)}
                                                    </Typography>
                                                </Stack>
                                            </Box>

                                            <Button
                                                variant="contained"
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={() =>
                                                    navigate(
                                                        `/${meeting.meetingCode}`
                                                    )
                                                }
                                                sx={{
                                                    borderRadius: 2,
                                                    px: 2.5,
                                                    py: 1,
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    bgcolor: '#536dfe',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        bgcolor: '#3f51d7',
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                Rejoin
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mt: 4
                                }}
                            >
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(event, value) =>
                                        setPage(value)
                                    }
                                    color="primary"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton
                                    siblingCount={1}
                                    boundaryCount={1}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Showing{' '}
                                    {(page - 1) * meetingsPerPage + 1}
                                    {'–'}
                                    {Math.min(
                                        page * meetingsPerPage,
                                        filteredMeetings.length
                                    )}{' '}
                                    of {filteredMeetings.length} meetings
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
