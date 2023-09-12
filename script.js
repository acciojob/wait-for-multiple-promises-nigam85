//your JS code here. If required.
  function createRandomPromise() {
            const randomTimeout = Math.random() * 2000 + 1000; // Random time between 1000ms and 3000ms
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(randomTimeout / 1000); // Resolve with time taken in seconds
                }, randomTimeout);
            });
        }

        // Create an array of three promises
        const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

        // Wait for all promises to resolve using Promise.all
        Promise.all(promises)
            .then((results) => {
                // Remove the loading row
                const table = document.querySelector('table');
                const loadingRow = table.querySelector('tr:nth-child(2)');
                loadingRow.remove();

                // Populate the table with results
                results.forEach((time, index) => {
                    const row = document.createElement('tr');
                    const promiseCell = document.createElement('td');
                    promiseCell.textContent = `Promise ${index + 1}`;
                    const timeCell = document.createElement('td');
                    timeCell.textContent = time.toFixed(3); // Format time to 3 decimal places
                    row.appendChild(promiseCell);
                    row.appendChild(timeCell);
                    table.appendChild(row);
                });

                // Calculate and add the total time
                const totalTime = results.reduce((acc, time) => acc + time, 0);
                const totalRow = document.createElement('tr');
                const totalLabelCell = document.createElement('td');
                totalLabelCell.textContent = 'Total';
                const totalTimeCell = document.createElement('td');
                totalTimeCell.textContent = totalTime.toFixed(3);
                totalRow.appendChild(totalLabelCell);
                totalRow.appendChild(totalTimeCell);
                table.appendChild(totalRow);
            })
            .catch((error) => {
                console.error('Error:', error);
            });