function getValueByKey(json, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], json);
}

// Recursive function to update link titles with actual values from JSON
export function mapKeysToValues(linksArray, json) {
    return linksArray.map(link => {
        const updatedLink = { ...link };
        updatedLink.title = getValueByKey(json, link.title) || link.title;

        if (link.children) {
            updatedLink.children = mapKeysToValues(link.children, json);
        }

        return updatedLink;
    });
}