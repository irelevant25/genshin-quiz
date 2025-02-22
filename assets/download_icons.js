(async function downloadImages() {
    async function downloadImage(imgUrl, imgName) {
        if (!imgUrl) {
            console.warn(`Image ${imgName} not found`);
            return;
        }
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
    const rarities = [];
    const elements = [];
    const weapons = [];
    const regions = [];

    const rows = document.querySelectorAll('div > div > div.table-wide-inner > table.fandom-table > tbody > tr');
    for (let i = 0; i < rows.length; i++) {
        const item = rows[i];
        const rarityUrl = item.querySelectorAll('td')[2].querySelector('img')?.src.split('/revision/')[0];
        const rarity_name = item.querySelectorAll('td')[2].querySelector('img')?.getAttribute('data-image-key');
        if (!rarities.includes(rarityUrl)) {
            rarities.push(rarityUrl);
            await downloadImage(rarityUrl, rarity_name);
        }

        const elementUrl = item.querySelectorAll('td')[3].querySelector('img')?.src.split('/revision/')[0];
        const element_name = item.querySelectorAll('td')[3].querySelector('img')?.getAttribute('data-image-key');
        if (!elements.includes(elementUrl)) {
            elements.push(elementUrl);
            await downloadImage(elementUrl, element_name);
        }

        const weapon_typeUrl = item.querySelectorAll('td')[4].querySelector('img')?.src.split('/revision/')[0];
        const weapont_type_name = item.querySelectorAll('td')[4].querySelector('img')?.getAttribute('data-image-key');
        if (!weapons.includes(weapon_typeUrl)) {
            weapons.push(weapon_typeUrl);
            await downloadImage(weapon_typeUrl, weapont_type_name);
        }

        const regionUrl = item.querySelectorAll('td')[5].querySelector('img')?.src.split('/revision/')[0];
        const region_name = item.querySelectorAll('td')[5].querySelector('img')?.getAttribute('data-image-key');
        if (!regions.includes(regionUrl)) {
            regions.push(regionUrl);
            await downloadImage(regionUrl, region_name);
        }
    }

    console.log('All downloads complete!');
})();
