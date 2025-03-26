// components/YouTubePlayer.js
import { WebView } from 'react-native-webview';
import React from 'react';

const YouTubePlayer = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <WebView
            source={{ uri: embedUrl }}
            style={{ height: 220, borderRadius: 10 }}
            allowsFullscreenVideo
        /> 
    );
};

export default YouTubePlayer;