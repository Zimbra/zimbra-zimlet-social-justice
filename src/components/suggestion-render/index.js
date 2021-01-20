import { createElement, Component } from 'preact';

const SuggestionRender = props => {

    let items = props.suggestions.map(suggest => {
        return <button data-suggestion={suggest}>{suggest}</button>;
    }
    );
    return (<div>{items}</div>);
};

export default SuggestionRender;
