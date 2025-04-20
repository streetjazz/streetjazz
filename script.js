

// Function to handle scrolling and sync it with audio
function handleScroll() {
    if (isScrolling) return;  // Prevent excessive calls while scrolling

    const scrollPosition = window.scrollY;
    const contentHeight = content.scrollHeight - window.innerHeight;
    const audioDuration = audio.duration;
    
    // Calculate the audio time based on how far the user has scrolled
    const scrollPercentage = scrollPosition / contentHeight;
    audio.currentTime = audioDuration * scrollPercentage;
}

// Function to scroll the page based on audio time
function syncScrollWithAudio() {
    const scrollPosition = audio.currentTime / audio.duration;
    const contentHeight = content.scrollHeight - window.innerHeight;
    window.scrollTo(0, contentHeight * scrollPosition);
}

// Listen for the scroll event
window.addEventListener('scroll', () => {
    if (!audio.paused && audio.currentTime !== 0) {
        handleScroll();
    }
});


// Listen for changes in audio playback time
audio.addEventListener('timeupdate', () => {
    if (!isScrolling) {
        syncScrollWithAudio();
    }
});

// Path to your images folder
const imageFolder = 'images/';

// List of image files you want to load (manually, or from server-side if dynamic)
const imageFiles = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11jpg',
    'img12.jpg',
    // Add more image files here as needed
];

// Function to load the images
function loadImages() {
    const imageGallery = document.getElementById('image-gallery');

    imageFiles.forEach(imageFile => {
        const img = document.createElement('img');
        img.src = `${imageFolder}${imageFile}`;
        img.alt = `Image from ${imageFile}`;
        img.classList.add('gallery-image');  // Optional: Add a class for styling
        imageGallery.appendChild(img);
    });
}

// Call the function to load images when the page loads
window.addEventListener('load', loadImages);

const audio = document.getElementById('audio');
const content = document.getElementById('content');
let isDragging = false;
let startY = 0;
let scrollStart = 0;

// Function to handle the actual drag scrolling and audio sync
function handleDragScroll(event) {
    if (!isDragging) return;

    const distance = startY - event.clientY;
    const contentHeight = content.scrollHeight - window.innerHeight;
    const audioDuration = audio.duration;

    // Update scroll position
    window.scrollTo(0, scrollStart + distance);

    // Sync the audio playback with the new scroll position
    const scrollPosition = (window.scrollY / contentHeight);
    audio.currentTime = scrollPosition * audioDuration;
}

// Mouse down event (start drag)
content.addEventListener('mousedown', (event) => {
    isDragging = true;
    startY = event.clientY;
    scrollStart = window.scrollY;

    // Change cursor to indicate dragging
    document.body.style.cursor = 'grab';
});

// Mouse move event (dragging)
document.addEventListener('mousemove', handleDragScroll);

// Mouse up event (stop drag)
document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'auto';  // Reset cursor when dragging stops
});

// Optionally, prevent text selection while dragging
document.addEventListener('selectstart', (event) => {
    if (isDragging) {
        event.preventDefault();  // Prevent text selection during drag
    }
});
// Touch events for mobile support
content.addEventListener('touchstart', (event) => {
  isDragging = true;
  startY = event.touches[0].clientY;
  scrollStart = window.scrollY;
  document.body.style.cursor = 'grab';  // Optionally change cursor on touch
});

document.addEventListener('touchmove', (event) => {
  if (!isDragging) return;
  const distance = startY - event.touches[0].clientY;
  const contentHeight = content.scrollHeight - window.innerHeight;
  const audioDuration = audio.duration;

  // Update scroll position
  window.scrollTo(0, scrollStart + distance);

  // Sync the audio playback with the new scroll position
  const scrollPosition = (window.scrollY / contentHeight);
  audio.currentTime = scrollPosition * audioDuration;
});

document.addEventListener('touchend', () => {
  isDragging = false;
  document.body.style.cursor = 'auto';
});

