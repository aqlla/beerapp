import * as React from 'react';
import { Component } from 'react';
import axios from "axios";
import SearchSuggestions from "./SearchSuggestions";
import IBeerData from "../../../models/IBeerData";

export interface ISearchOptions {
    suggestionLimit: number;
}

export interface ISearchState<T = any> {
    query: string;
    results: T;
}

type SearchState<T> = Readonly<ISearchState<T>>
type SearchOptions = Readonly<ISearchOptions>

class Search extends Component<SearchOptions, SearchState<IBeerData[]>> {
    private searchElement: HTMLInputElement;
    public readonly state: SearchState<IBeerData[]> = {
        query: '',
        results: null
    };

    private static async get(endpoint: string): Promise<IBeerData[]> {
        try {
            const res = await axios.get(`https://beer.aquil.la/${endpoint}`);
            if (res.data) {
                return res.data;
            } else {
                return [];
            }
        } catch(e)  {
            console.error(e);
        }
    }

    onInputChange = () => {
        this.setState({ query: this.searchElement.value },async () => {
            if (this.state.query && this.state.query.length > 1) {
                const results = await Search.get(`api/s/${this.state.query}?limit=${this.props.suggestionLimit}`);
                this.setState({ results });
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
                <SearchSuggestions data={this.state.results}/>
            </form>
        )
    }
}

export default Search;

