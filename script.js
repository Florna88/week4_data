Papa.parse("movies.csv", {
  download: true,
  header: true,
  skipEmptyLines: "greedy",

  complete: function (results) {
    const tbody = document.querySelector("#dataTable tbody");
    const status = document.querySelector("#status");

    const columns = [
      "title",
      "Genre",
      "Audience",
      "critics",
      "Year"
    ];

    tbody.textContent = "";

    results.data.forEach(function (row) {
      const tr = document.createElement("tr");

      columns.forEach(function (column) {
        const td = document.createElement("td");

        td.textContent = row[column] ?? "";
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    status.textContent =
      results.data.length + " movies loaded.";
  },

  error: function (error) {
    document.querySelector("#status").textContent =
      "Could not load movies.csv. Please check the file name and open the website through a web server or GitHub Pages.";

    console.error(error);
  }
});