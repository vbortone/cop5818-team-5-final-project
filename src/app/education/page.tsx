"use client";

import { useEffect, useState } from 'react';
import styles from './educationPage.module.css'; // Import the CSS module
import { IconContext } from 'react-icons';
import { FaGraduationCap } from 'react-icons/fa';

interface Video {
  title: string;
  videoId: string;
  description: string;
  tags: string[];
}

const EducationPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
  
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/education/videos');
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.statusText}`);
        }
        const data: Video[] = await response.json();
        if (isMounted) {
          setVideos(data);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(`Error: ${err.message}`);
          } else {
            setError('An unknown error occurred while fetching videos');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    fetchVideos();
  
    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  }, []);

  return (
    <div className={styles.educationPage}>
      <header className={styles.header}>
        <h1>
          <IconContext.Provider value={{ className: styles.icon }}>
            <FaGraduationCap />
          </IconContext.Provider>
          Education Center
        </h1>
        <p>Find videos ranging from fundamental lessons all the way to advanced concepts.</p>
      </header>
      {loading && <p className={styles.loading}>Loading videos...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.videos}>
        {videos.map((video) => (
          <div key={video.videoId} className={styles.video}>
            <h2>{video.title}</h2>
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
