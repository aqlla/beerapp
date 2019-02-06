import * as React from 'react'

export interface ISearchSuggestionsOptions {
    results: any[];
}

const SearchSuggestions = (options: ISearchSuggestionsOptions) => {
    console.log(options);
    if (options && options.results && options.results.hasOwnProperty("map") && typeof options.results.map === "function") {
        const suggestions = options.results.map(r => (
            <li key={r.id}>
                {r.name}
            </li>
        ));
        console.log(suggestions);
        return <ul>{suggestions}</ul>
    } else {
        return <span>{options}</span>;
    }
};

export default SearchSuggestions