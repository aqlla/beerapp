import * as React from 'react';
import { Component } from 'react';
import axios, { AxiosResponse, AxiosPromise } from "axios";
import SearchSuggestions from "./SearchSuggestions";
import IBeerData from "../../../models/IBeerData";

export interface ISearchOptions {}

export interface ISearchState<T = any> {
    query: string;
    results: T;
}

class Search extends Component {
    private searchElement: HTMLInputElement;
    public state: ISearchState<AxiosResponse<IBeerData[]>> = {
        query: '',
        results: null
    };

    private static async get(endpoint: string): Promise<AxiosResponse<IBeerData[]>> {
        try {
            return await axios.get(`https://beer.aquil.la/${endpoint}`);
        } catch(e)  {
            console.error(e);
        }
    }

    onInputChange = () => {
        this.setState({ query: this.searchElement.value },async () => {
            if (this.state.query && this.state.query.length > 1) {
                this.setState({
                    results: await Search.get(`api/s/${this.state.query}?max=20`)
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

