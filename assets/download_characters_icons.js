(async function downloadImages() {
    const rows = document.querySelectorAll('div > div > div.table-wide-inner > table.fandom-table > tbody > tr');
    for (let i = 0; i < rows.length; i++) {
        const imgUrl = rows[i].querySelectorAll('td')[0].querySelector('img').src.split('/revision/')[0];
        const imgName = rows[i].querySelectorAll('td')[0].querySelector('img').getAttribute('data-image-key');
        console.log(`Downloading ${imgName}: ${imgUrl}`);
        try {
            const imgResponse = await fetch(imgUrl);
            const blob = await imgResponse.blob();

            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = imgName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (imgErr) {
            console.error(`Failed to download ${imgName}:`, imgErr);
        }
    }

    console.log('All downloads complete!');
})();
