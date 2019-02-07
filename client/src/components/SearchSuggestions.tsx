import * as React from 'react'
import IBeerData from "../../../models/IBeerData";

export interface ISearchSuggestionsOptions {
    data: IBeerData[];
    classname?: string;
}

const SearchSuggestions = (props: ISearchSuggestionsOptions) => {
    const classname = props.classname || 'search-suggestions';
    if (props.data) {
        const suggestions = props.data.map(r => (
            <div key={r.id} className={`${classname}-item`}>
                <header className={`${classname}-item-header`}>
                    {r.name}
                </header>
                <div className={`${classname}-item-body`}>
                    {r.breweryName} - {r.style}
                </div>
            </div>
        ));
        return <div className={classname}>{suggestions}</div>
    } else {
        return null;
    }
};

export default SearchSuggestions