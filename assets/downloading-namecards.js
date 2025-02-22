(async function downloadImages() {
    const items = document.querySelectorAll("div#gallery-11 > div.wikia-gallery-item");

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const url = item.querySelector("a.image").href;
        const characterName = item.querySelector("div.lightbox-caption > a").title;

        try {
            const response = await fetch(url);
            const htmlString = await response.text();

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            const imageLinks = doc.querySelectorAll("div.pi-image-collection.wds-tabber > div.wds-tab__content a.image.image-thumbnail");

            // List of image types
            const imageTypes = ['icon', 'background', 'banner'];

            for (let i = 0; i < imageTypes.length; i++) {
                const imageLink = imageLinks[i];
                if (imageLink) {
                    const imgUrl = imageLink.href;
                    console.log(`Downloading ${imageTypes[i]} for ${characterName}: ${imgUrl}`);

                    try {
                        const imgResponse = await fetch(imgUrl);
                        const blob = await imgResponse.blob();

                        const blobUrl = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = `${imageTypes[i]}_${characterName}.png`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(blobUrl);
                    } catch (imgErr) {
                        console.error(`Failed to download ${imageTypes[i]} for ${characterName}:`, imgErr);
                    }
                } else {
                    console.warn(`Image ${imageTypes[i]} not found for ${characterName}`);
                }
            }
        } catch (err) {
            console.error(`Failed to process ${url}:`, err);
        }
    }

    console.log('All downloads complete!');
})();
