function getValueByKey(json, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], json);
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