import React, { useEffect, useState } from 'react';

const Spotify = () => {
    const [token, setToken] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeDeviceId, setActiveDeviceId] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/token`);
                const data = await response.json();
                setToken(data.access_token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            console.log('--------------',token);
            
            const getDevices = async () => {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
            
                    // Log the raw response text
                    const responseText = await response.text();
                    console.log('Response Text:', responseText); // This will show you what was actually returned
            
                    if (!response.ok) {
                        console.error('Failed to fetch devices:', response);
                        return;
                    }
            
                    const data = JSON.parse(responseText); // Manually parse the response if it's JSON
                    console.log('Active Devices:', data.devices);
            
                    if (data.devices && data.devices.length > 0) {
                        setActiveDeviceId(data.devices[0].id); // Use the first device as active
                    } else {
                        console.log('No active devices found.');
                    }
                } catch (error) {
                    console.error('Error fetching devices:', error);
                }
            };
            
    
            getDevices();
        }
    }, [token]);
     

    useEffect(() => {
        if (token) {
            const searchTracks = async () => {
                try {
                    const query = 'kd desi rok'; // Replace with your search query
                    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setTracks(data.tracks.items);
                } catch (error) {
                    console.error('Error fetching tracks:', error);
                }
            };

            searchTracks();
        }
    }, [token]);

    const playTrack = (uri) => {
        if (token && activeDeviceId) {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDeviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [uri] }),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                setIsPlaying(true);
                setCurrentTrack(uri); // Track now playing
            }).catch(error => {
                console.error('Error playing track:', error);
            });
        }
    };

    const pauseTrack = () => {
        if (token && activeDeviceId) {
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${activeDeviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).then(() => {
                setIsPlaying(false);
            }).catch(error => {
                console.error('Error pausing track:', error);
            });
        }
    };

    const nextTrack = () => {
        if (token && activeDeviceId) {
            fetch(`https://api.spotify.com/v1/me/player/next?device_id=${activeDeviceId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).catch(error => {
                console.error('Error skipping to next track:', error);
            });
        }
    };

    const previousTrack = () => {
        if (token && activeDeviceId) {
            fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${activeDeviceId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).catch(error => {
                console.error('Error skipping to previous track:', error);
            });
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack(tracks[0].uri); // Play the first track
        }
    };

    return (
        <div className='pt-20 text-center'>
            <h1 className='text-4xl'>Spotify Search Results</h1>
            {tracks?.length > 0 ? (
                <div>
                    <div className="controls">
                        <button onClick={previousTrack}>Previous</button>
                        <button onClick={handlePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={nextTrack}>Next</button>
                    </div>
                    {tracks?.map((track, index) => (
                        <div key={index} className='mt-4'>
                            <h2>{track.name}</h2>
                            <img src={track.album.images[0].url} alt={track.name} style={{ width: 200 }} />
                            <p>Artist: {track.artists[0].name}</p>
                            <button onClick={() => playTrack(track.uri)}>Play</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Spotify;
