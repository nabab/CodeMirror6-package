import {EditorState, Compartment} from "@codemirror/state"
import {language} from "@codemirror/language"
import {htmlLanguage, html} from "@codemirror/lang-html"
import {php} from "@codemirror/lang-php"
import {css} from "@codemirror/lang-css"
import {javascript} from "@codemirror/lang-javascript"
import {json} from "@codemirror/lang-json"
import {markdown} from "@codemirror/lang-markdown"
import {xml} from "@codemirror/lang-xml"
import {sql} from "@codemirror/legacy-modes/mode/sql"
import {shell} from "@codemirror/legacy-modes/mode/shell"

import {EditorView, basicSetup} from "@codemirror/basic-setup"

const languageConf = new Compartment

const autoLanguage = EditorState.transactionExtender.of(tr => {
  if (!tr.docChanged) {
    return null
  }
  let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
  let stateIsHTML = tr.startState.facet(language) == htmlLanguage
  if (docIsHTML == stateIsHTML) {
    return null
  }
  return {
    effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
  }
})

window.codemirror = {
  EditorView: EditorView,
  EditorState: EditorState,
  basicSetup: basicSetup,
  html: html,
  php: php,
  css: css,
  javascript: javascript,
  json: json,
  markdown: markdown,
  xml: xml,
  sql: sql,
  shell: shell,
  autoLanguage: autoLanguage,
  languageConf: languageConf
 };