document.querySelectorAll('div > div > div.table-wide-inner > table.fandom-table > tbody > tr').forEach(item => {
    const character_name = item.querySelectorAll('td')[1].querySelector('a').title;
    if (character_name === 'Traveler') return;
    const rarity = item.querySelectorAll('td')[2].children[0].title.split(' ')[0];
    const rarity_icon = "assets/rarity/" + item.querySelectorAll('td')[2].children[0].getAttribute('data-image-key');
    const element = item.querySelectorAll('td')[3].querySelector('a').title;
    const element_icon = "assets/element/" + item.querySelectorAll('td')[3].querySelector('img').getAttribute('data-image-key');
    const weapon_type = item.querySelectorAll('td')[4].querySelector('a').title;
    const weapont_type_icon = "assets/weapon_type/" + item.querySelectorAll('td')[4].querySelector('img').getAttribute('data-image-key');
    const region = item.querySelectorAll('td')[5].querySelector('a')?.title ?? 'None';
    const region_icon = "assets/region/" + item.querySelectorAll('td')[5].querySelector('img')?.getAttribute('data-image-key') ?? region;
    const model_type = item.querySelectorAll('td')[6].querySelector('a').textContent;
    const release_date = item.querySelectorAll('td')[7].textContent;
    const version = item.querySelectorAll('td')[8].querySelector('a').textContent;
    const data_item = data.find(x => x.name === character_name);
    if (data_item) {
        data_item.rarity = rarity;
        data_item.rarity_icon = rarity_icon;
        data_item.element = element;
        data_item.element_icon = element_icon;
        data_item.weapon_type = weapon_type;
        data_item.weapont_type_icon = weapont_type_icon;
        data_item.region = region;
        data_item.region_icon = region_icon;
        data_item.model_type = model_type;
        data_item.release_date = release_date;
        data_item.version = version;
    }
    else {
        console.log('Data item not found for ' + character_name);
    }
});