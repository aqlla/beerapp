import axios from "axios";
import * as React from "react";
import { Component } from "react";
import IBeerData from "../../models/IBeerData";
import SearchSuggestions from "./SearchSuggestions";

export interface ISearchOptions {
    suggestionLimit: number;
}

export interface ISearchState<T = any> {
    query: string;
    results: T;
}

type SearchState<T> = Readonly<ISearchState<T>>;
type SearchOptions = Readonly<ISearchOptions>;

class Search extends Component<SearchOptions, SearchState<IBeerData[]>> {

    private static async get(endpoint: string): Promise<IBeerData[]> {
        try {
            const res = await axios.request({
                method: "GET",
                url: `http://localhost:8080/${endpoint}`
            });
            if (res.data) {
                return res.data;
            } else {
                return [];
            }
        } catch (e)  {
            console.error(e);
        }
    }
    public readonly state: SearchState<IBeerData[]> = {
        query: "",
        results: null
    };
    private searchElement: HTMLInputElement;

    public onInputChange = () => {
        this.setState({ query: this.searchElement.value }, async () => {
            if (this.state.query && this.state.query.length > 1) {
                const results = await Search.get(`api/s/${this.state.query}?limit=${this.props.suggestionLimit}`);
                this.setState({ results });
            }
        });
    }

    public render() {
        return (
            <form>
                <input
                    placeholder="Search"
                    ref={(input) => this.searchElement = input}
                    onChange={this.onInputChange}
                />
                <SearchSuggestions data={this.state.results}/>
            </form>
        );
    }
}

export default Search;
