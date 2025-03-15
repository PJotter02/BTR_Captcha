document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('captchaVideo');
    const videoSource = document.getElementById('videoSource');
    const captchaCountInput = document.getElementById('captchaCount');
    const videoData = document.getElementById('videoData'); // Access #videoData element
    const promptLabel = document.querySelector('label[for="captchaCount"]'); // Access the label for the prompt

    // Get all videos and prompts from data attributes
    const videos = [
        { src: videoData.dataset.video1, prompt: videoData.dataset.prompt1, answer: 4 },
        { src: videoData.dataset.video2, prompt: videoData.dataset.prompt2, answer: 4 },
        { src: videoData.dataset.video3, prompt: videoData.dataset.prompt3, answer: 5 },
        { src: videoData.dataset.video4, prompt: videoData.dataset.prompt4, answer: 5 }
    ];

    // Randomly select a video
    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

    // Update video source and reload
    videoSource.src = selectedVideo.src;
    videoElement.load();

    // Update the prompt text dynamically
    promptLabel.textContent = selectedVideo.prompt;

    // Store correct answer for validation
    const correctAnswer = selectedVideo.answer;

    // Validate user input on form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        const userAnswer = captchaCountInput.value.trim();
        const parsedAnswer = parseInt(userAnswer, 10);

        if (parsedAnswer !== correctAnswer) {
            event.preventDefault();
            alert(`Incorrect count. Please try again.`);
        }
    });
});
