import * as React from 'react';
import { Component } from 'react';

export interface ISearchOptions {

}
let val: any;
function submit(args: any) {

}

export const Search = (options: ISearchOptions) =>
    <form onSubmit={submit}>
        <label>
            <input type="text" value={val} onChange={submit} />
        </label>
        <input type="submit" value="Submit" />
    </form>;