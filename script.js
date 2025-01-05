<script>
/* script.js */

// Handle form submission
document.getElementById("reddit-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  const urlInput = document.getElementById("reddit-url").value; // Get the URL input
  const resultsDiv = document.getElementById("results");

  // Clear previous results
  resultsDiv.innerHTML = "Analyzing...";

  try {
    // Send the Reddit URL to the backend
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    });

    // Handle response
    if (!response.ok) {
      throw new Error("Failed to fetch data. Please try again.");
    }

    const data = await response.json();

    // Display results
    resultsDiv.innerHTML = `
      <h3>Results:</h3>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Subreddit:</strong> ${data.subreddit}</p>
      <p><strong>Author:</strong> ${data.author}</p>
      <h4>Comments:</h4>
      <ul>
        ${data.comments.map((comment) => `<li>${comment}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

    // Example API call (replace with your backend endpoint)
    const response = await fetch('/fetch_comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();

    // Populate comments
    const commentTable = document.getElementById('comment-table');
    commentTable.innerHTML = data.comments
        .map(comment => `
            <tr>
                <td>${comment.username}</td>
                <td>${comment.karma}</td>
                <td>${comment.text}</td>
            </tr>
        `).join('');

    // Populate phrases
    const phraseResults = document.getElementById('phrase-results');
    phraseResults.innerHTML = data.phrases
        .map(phrase => `<li>${phrase.text} (${phrase.count})</li>`)
        .join('');

    // Populate summary
    document.getElementById('summary-text').innerText = data.summary;

    // Populate sentiment chart (example using Chart.js)
    const ctx = document.getElementById('sentiment-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [{
                data: data.sentiment,
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
            }],
        },
    });
});
</script>
