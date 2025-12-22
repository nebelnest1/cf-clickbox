var getCurrentLanguage = () => {
    const urlParams = window.location.search;
    const paramLang = new URLSearchParams(urlParams).get("lang");
    const userBrowserLang = navigator.language.split("-")[0];
    return paramLang || userBrowserLang || "en";
};
var translationsCache = {};
var getTranslations = async (loadFallbackTranslation2) => {
    const lang = getCurrentLanguage();
    if (!translationsCache[lang]) {
        translationsCache[lang] = (async () => {
            try {
                const response = await fetch(`./locales/${lang}.json`);
                return await response.json();
            } catch {
                return await loadFallbackTranslation2();
            }
        })();
    }
    return translationsCache[lang];
};
var loadFallbackTranslation = async () => {
    return await import("./shared-7UHMBXNQ.js").then((m) => m.default);
};

export {
    getCurrentLanguage,
    getTranslations,
    loadFallbackTranslation
};