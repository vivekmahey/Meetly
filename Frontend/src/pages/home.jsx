import React, { useContext } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = React.useState('');

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`);
    };
    const router = useNavigate();

    return (                                     // Only Registered users can access this page, if user is not registered then he will be redirected to login page

        <>
            <div className="navBar">
                <div onClick={() => {
                    router("/")
                }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <h2>Meetly</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        className="historyButton"
                        startIcon={<RestoreIcon />}
                        onClick={() => navigate('/history')}
                    >
                        History
                    </Button>
                    <Button className="loginbtn" onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/auth');
                    }}>
                        Logout
                    </Button>
                </div>

            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <h2>Providing Quality Video Calls <br />And Seamless Collaboration</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <TextField placeholder="Enter Meeting Code" id="outlined-basic" label="Meeting Code" variant="outlined"
                            value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} />
                        <Button onClick={handleJoinVideoCall} variant="contained" color="primary">Join</Button>
                    </div>
                </div>
                <div className="rightPanel">
                    <img srcSet="/logo2.png" alt="logo" />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)  // Auth function is used to check if user is registered or not, if user is not registered then he will be redirected to login page
