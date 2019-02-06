import * as React from 'react'

export interface ISearchSuggestionsOptions {
    results: any[];
}

const SearchSuggestions = (props: ISearchSuggestionsOptions) => {
    const options = props.results.map(r => (
        <li key={r.id}>
            {r.name}
        </li>
    ));
    return <ul>{options}</ul>
};

export default SearchSuggestions