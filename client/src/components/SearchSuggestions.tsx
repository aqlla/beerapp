import * as React from 'react'
import {AxiosResponse} from "axios";
import IBeerData from "../../../models/IBeerData";

export interface ISearchSuggestionsOptions {
    results: AxiosResponse<IBeerData[]>;
    classname?: string;
}

const SearchSuggestions = (options: ISearchSuggestionsOptions) => {
    const classname = options.classname || 'search-suggestions';
    if (options && options.results && options.results.data && options.results.data.map) {
        const suggestions = options.results.data.map(r => (
            <div key={r.id} className={`${classname}-item`}>
                <header className={`${classname}-item-body`}>
                    {r.name}
                </header>
                <div className={`${classname}-item-body`}>
                    {r.breweryName} - {r.style}
                </div>
            </div>
        ));
        return <div className={classname}>{suggestions}</div>
    } else {
        return <span>{options.toString()}</span>;
    }
};

export default SearchSuggestions