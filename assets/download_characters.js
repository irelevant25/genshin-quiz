(async function downloadImages() {
    const characters = ['Albedo', 'Alhaitham', 'Aloy', 'Amber', 'Arlecchino', 'Baizhu', 'Barbara', 'Beidou', 'Bennett', 'Candace',
        'Charlotte', 'Chasca', 'Chevreuse', 'Tartaglia', 'Chiori', 'Chongyun', 'Citlali', 'Clorinde', 'Collei', 'Cyno',
        'Dehya', 'Diluc', 'Diona', 'Dori', 'Emilie', 'Eula', 'Faruzan', 'Fischl', 'Freminet', 'Furina', 'Gaming',
        'Ganyu', 'Gorou', 'Hu Tao', 'Itto', 'Jean', 'Kachina', 'Kaedehara Kazuha', 'Kaeya', 'Kamisato Ayaka',
        'Kamisato Ayato', 'Kaveh', 'Keqing', 'Kinich', 'Kirara', 'Klee', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan',
        'Layla', 'Lisa', 'Lynette', 'Lyney', 'Mavuika', 'Mika', 'Mona', 'Mualani', 'Nahida', 'Navia', 'Neuvillette',
        'Nilou', 'Ningguang', 'Noelle', 'Ororon', 'Qiqi', 'Raiden Shogun', 'Razor', 'Rosaria', 'Sangonomiya Kokomi',
        'Sayu', 'Sethos', 'Shenhe', 'Shikanoin Heizou', 'Sigewinne', 'Sucrose', 'Thoma', 'Tighnari', 'Venti',
        'Wanderer', 'Wriothesley', 'Xiangling', 'Xianyun', 'Xiao', 'Xilonen', 'Xingqiu', 'Xinyan', 'Yae Miko',
        'Yanfei', 'Yaoyao', 'Yelan', 'Yoimiya', 'Yumemizuki Mizuki', 'Yun Jin', 'Zhongli'];

    for (let index = 0; index < characters.length; index++) {
        const characterName = characters[index];
        const url = 'https://genshin-impact.fandom.com/wiki/' + characterName.split(' ').join('_');

        try {
            const response = await fetch(url);
            const htmlString = await response.text();

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            // find image
            const imageLink = doc.querySelectorAll("div.pi-image-collection.wds-tabber > div.wds-tab__content a.image.image-thumbnail")[0] // card
            // const imageLink = doc.querySelectorAll("div.pi-image-collection.wds-tabber > div.wds-tab__content a.image.image-thumbnail")[1] // wish
            // const imageLink = doc.querySelectorAll("div.pi-image-collection.wds-tabber > div.wds-tab__content a.image.image-thumbnail")[2] // ingame
            const imgUrl = imageLink.href;
            console.log(`Downloading ${characterName}: ${imgUrl}`);

            try {
                const imgResponse = await fetch(imgUrl);
                const blob = await imgResponse.blob();

                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `${characterName}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(blobUrl);
            } catch (imgErr) {
                console.error(`Failed to download ${imageTypes[i]} for ${characterName}:`, imgErr);
            }
        } catch (err) {
            console.error(`Failed to process ${url}:`, err);
        }
    }

    console.log('All downloads complete!');
})();
