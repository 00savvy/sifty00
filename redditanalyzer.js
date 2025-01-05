// redditAnalyzer.js
export async function analyzeRedditPost(url) {
    if (!url.startsWith("https://www.reddit.com/r/")) {
        alert("Please enter a valid Reddit URL.");
        return;
    }

    // Show a loading state
    document.getElementById("loading").style.display = "block";

    try {
        // Example: Fetch data from your backend or an API
        const response = await fetch(`/analyze?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch Reddit data.");
        }

        const data = await response.json();
        console.log("Reddit post analysis:", data);

        // Display the results (you can implement your logic here)
        alert("Analysis complete. Check the console for details.");
    } catch (error) {
        console.error("Error analyzing the post:", error);
        alert("An error occurred while analyzing the post.");
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}
