export function getValueByKey(json, key) {
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

export function replaceConfigStrings(config, dictionary) {
    if (Array.isArray(config)) {
        return config.map(item => replaceConfigStrings(item, dictionary));
    } else if (typeof config === 'object' && config !== null) {
        const newObj = {};
        for (const key in config) {
            if (config.hasOwnProperty(key)) {
                newObj[key] = replaceConfigStrings(config[key], dictionary);
            }
        }
        return newObj;
    } else if (typeof config === 'string') {
        const value = getValueByKey(dictionary, config);
        return value !== undefined ? value : config;
    } else {
        return config;
    }
}