<script>
/* script.js */

// Handle form submission
document.getElementById('reddit-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = document.getElementById('reddit-url').value;

    if (!url) {
        alert('Please enter a valid Reddit post URL.');
        return;
    }

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
