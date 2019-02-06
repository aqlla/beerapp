import * as React from 'react'
import {AxiosResponse} from "axios";
import IBeerData from "../../../models/IBeerData";

export interface ISearchSuggestionsOptions {
    results: AxiosResponse<IBeerData[]>;
}

const SearchSuggestions = (options: ISearchSuggestionsOptions) => {
    console.log('results (Search.state.results): ');
    console.log(options);
    if (options && options.results && options.results.data) {
        const suggestions = options.results.data.map(r => (
            <li key={r.id}>
                {r.name}
            </li>
        ));
        console.log(suggestions);
        return <ul>{suggestions}</ul>
    } else {
        return <span>{options.toString()}</span>;
    }
};

export default SearchSuggestions