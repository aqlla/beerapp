import * as React from 'react';
import { Component } from 'react';
import axios from "axios";
import SearchSuggestions from "./SearchSuggestions";

export interface IData<TKey> {
    id: TKey
}

export interface IBeerData extends IData<number> {
    name: string;
    style: string;
    breweryId: string;
    breweryName: string;
    abv: number;
    ibu: number;
    sizes: number[];
}

export interface ISearchOptions {}

export interface ISearchState {
    query: string;
    results: any[];
}

class Search extends Component {
    private searchElement: HTMLInputElement;
    public state: ISearchState = {
        query: '',
        results: []
    };

    private static async get(endpoint: any): Promise<any> {
        try {
            return await axios.get(`https://beer.aquil.la/${endpoint}`);
        } catch(e)  {
            console.error(e);
        }
    }

    onInputChange = () => {
        this.setState({ query: this.searchElement.value },async () => {
            console.log(this.state);
            if (this.state.query && this.state.query.length > 1 && this.state.query.length % 2 === 0) {
                this.setState({
                    results: await Search.get(`api/s/${this.state.query}`)
                });
            }
        })
    };

    render() {
        return (
            <form>
                <input
                    placeholder="Search"
                    ref={input => this.searchElement = input}
                    onChange={this.onInputChange}
                />
                <SearchSuggestions results={this.state.results}/>
            </form>
        )
    }
}

export default Search;

