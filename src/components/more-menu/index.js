import { createElement, Component, render } from 'preact';
import { withIntl } from '../../enhancers';
import { withText } from 'preact-i18n';
import SuggestionRender from '../suggestion-render';

/* this.props.getComposer() returns an instance of TinyMCE so this:
 * 
 * this.props.getComposer().on('keyup', function (e) {
 * is the same as:
 * window.parent.tinyMCE.activeEditor.on('keyup', function (e) {
 * 
 * and this:
 * this.props.getComposer().selection.setContent(clickedSuggestion);
 * is the same as:
 * window.parent.tinyMCE.activeEditor.selection.setContent(clickedSuggestion);
 * 
 * For more possibilities, please check: https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/
 *
 * tinyMCE uses the browsers native selection functionality, so you can also do stuff like:
 * var selRng = this.props.getComposer().selection.getRng();
 * this.props.getComposer().selection.getSel().modify('extend', 'backward', 'word');
 */

@withIntl()
@withText({
    title: 'social-justice-zimlet.title'
})

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.zimletContext = props.children.context;

        this.props.getComposer().on('keyup', function (e) {
            let body = this.props.getComposer().getContent();
            let suggestions = [];

            if (body.match(/master/gi)) {
                suggestions.push('master > primary')
            }

            if (body.match(/slave/gi)) {
                suggestions.push('slave > secondary')
            }

            if (body.match(/blacklist/gi)) {
                suggestions.push('blacklist > deny list')
            }

            if (body.match(/whitelist/gi)) {
                suggestions.push('whitelist > allow list')
            }

            if (body.match(/black hat/gi)) {
                suggestions.push('black hat > unethical')
            }

            if (body.match(/white hat/gi)) {
                suggestions.push('white hat > ethical')
            }

            if (suggestions.length > 0) {
                window.parent.document.getElementById('SocialJustzimlet').innerText = this.props.title;
            }
            else {
                window.parent.document.getElementById('SocialJustzimlet').innerText = "";
            }

            const renderedSuggestions = SuggestionRender({ suggestions: suggestions });
            render(<div onClick={e => this.handleClick(e)}>{renderedSuggestions}</div>, window.parent.document.getElementById('suggestionsDiv'));
        }.bind(this));
    }

    handleClick = (e) => {
        const clickedSuggestion = e.srcElement.getAttribute('data-suggestion').split(' > ');
        e.srcElement.innerText = "";
        let content = this.props.getComposer().getContent();
        content = content.replaceAll(clickedSuggestion[0], clickedSuggestion[1]);
        this.props.getComposer().setContent(content);
    }

    render() { return (<div style="background-color:#f2f2f2;"><div style="margin-left:15px" id="SocialJustzimlet"></div><div style="margin-left:15px" id="suggestionsDiv"></div></div>) }
}
