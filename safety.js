
const API_KEY = 'AIzaSyBWcpuKzHwc3oKsZQP1Bhm_P5uLBZtjwAE';
const CHANNEL_ID = 'UCDODesUN5l6aMzKj-WCZ8YA';
const VIDEO_COUNT = 5; 


const baseApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${VIDEO_COUNT}`;


function fetchVideos(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const videos = data.items;
      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = ''; 

      videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const description = video.snippet.description;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
          <h3><a href="${videoUrl}" target="_blank">${title}</a></h3>
          <p>${description}</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        videoContainer.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Error fetching videos:', error));
}


function searchVideos() {
  const query = document.getElementById('search-query').value.trim();
  let apiUrl = baseApiUrl;

 
  if (query) {
    apiUrl += `&q=${encodeURIComponent(query)}`;
  }

 
  fetchVideos(apiUrl);
}


fetchVideos(baseApiUrl);
