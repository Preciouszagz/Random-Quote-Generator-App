// Creating Variables
const quoteContainer = document.querySelector(".quote-container"),
animations = ['fadeIn','flipInX', 'slideInDown', 'backIn', 'fadeInDown', 'zoomIn', 'bounceInDown'],
quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
fbBtn = document.querySelector(".a2a_button_facebook"),
whatsappBtn = document.querySelector(".a2a_button_whatsapp"),
twitterBtn = document.querySelector(".a2a_button_twitter"),
synth = speechSynthesis;

// Function to fetch and display a random quote
function randomQuote(){
    // Letting user know that the site is loading a quote
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    // Fetching random quotes/data from the API and parsing it into a JavaScript object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        // Set the quote & author information
        quoteText.innerText = result.content;
        authorName.innerText = result.author;

        // Randomly select an animation from the array
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

        // Add the selected animation class to the quote-container
        quoteContainer.className = "quote-container animated " + randomAnimation;

        // Enable the quote button
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

soundBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);

        // Add the 'active' class to soundBtn
        soundBtn.classList.add("active");

        // Add the 'disabled-btn' class to quoteBtn
        quoteBtn.classList.add("disabled-btn");

        // Set an interval to check if the synthesizer is still speaking
        const soundCheck = setInterval(() => {
            if (!synth.speaking) {
                // If not speaking, remove 'active' class from soundBtn
                soundBtn.classList.remove("active");
                
                // Remove 'disabled-btn' class from quoteBtn
                quoteBtn.classList.remove("disabled-btn");

                // Clear the interval
                clearInterval(soundCheck);
            }
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    //copying the quote text on copyBtn click
    let copiedText = `${quoteText.innerText} --- ${authorName.innerText}`;
    navigator.clipboard.writeText(copiedText);
});

fbBtn.addEventListener("click", ()=>{
    let facebookMessage = `Check out this quote: ${quoteText.innerText} --- ${authorName.innerText}`;
    let placeholderUrl = 'wisdom-nuggets.vercel.app';
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(placeholderUrl)}&quote=${encodeURIComponent(facebookMessage)}`;
    window.open(facebookUrl, "_blank");

});

whatsappBtn.addEventListener("click", ()=>{
    let whatsappMessage = `${quoteText.innerText} --- ${authorName.innerText}`;
    let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} --- ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

// Call randomQuote when the page loads
document.addEventListener("DOMContentLoaded", randomQuote);

quoteBtn.addEventListener("click", () => {
    // Check if soundBtn is not active
    if (!soundBtn.classList.contains("active")) {
    // Trigger the randomQuote function
        randomQuote();
    }
});
