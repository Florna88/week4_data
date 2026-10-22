Papa.parse("movies.csv", {
  download: true,
  header: true,
  skipEmptyLines: "greedy",

  complete: function (results) {
    const movies = results.data;

    // Create the table
    const tbody = document.querySelector("#dataTable tbody");

    const columns = [
      "title",
      "Genre",
      "Audience",
      "critics",
      "Year"
    ];

    tbody.textContent = "";

    movies.forEach(function (row) {
      const tr = document.createElement("tr");

      columns.forEach(function (column) {
        const td = document.createElement("td");

        td.textContent = row[column] ?? "";
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    document.querySelector("#status").textContent =
      movies.length + " movies loaded.";

    // Select the first 10 movies
    const chartMovies = movies.slice(0, 10);

    const titles = chartMovies.map(function (row) {
      return row.title;
    });

    const audienceScores = chartMovies.map(function (row) {
      return Number(row.Audience);
    });

    const criticsScores = chartMovies.map(function (row) {
      return Number(row.critics);
    });

    // Create the bar chart
    new Chart(document.getElementById("ratingsChart"), {
      type: "bar",

      data: {
        labels: titles,

        datasets: [
          {
            label: "Audience Score",
            data: audienceScores,
            backgroundColor: "#4766b0"
          },
          {
            label: "Critics Score",
            data: criticsScores,
            backgroundColor: "#b45309"
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          y: {
            beginAtZero: true,
            max: 100,

            title: {
              display: true,
              text: "Score (0–100)"
            }
          },

          x: {
            ticks: {
              autoSkip: false,
              minRotation: 45,
              maxRotation: 60
            }
          }
        }
      }
    });
  },

  error: function (error) {
    document.querySelector("#status").textContent =
      "Could not load movies.csv.";

    console.error(error);
  }
});