import * as React from 'react'

export interface ISearchSuggestionsOptions {
    results: any[];
}

const SearchSuggestions = (options: ISearchSuggestionsOptions) => {
    if (options && options.results) {
        const suggestions = options.results.map(r => (
            <li key={r.id}>
                {r.name}
            </li>
        ));
        return <ul>{suggestions}</ul>
    } else {
        return null;
    }
};

export default SearchSuggestions