import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Renderer, setOptions } from 'marked';
import { highlight, getLanguage } from 'highlight.js';
import { sanitize } from 'dompurify';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnChanges {

  // This implementation is a modified version of the one found here from Nicolas Portmann:
  // https://ndportmann.com/client-side-markdown-to-html/

  @Input() text: string;
  data: SafeHtml;
  // variable to keep initialized markdown object
  md: any;

  constructor(private sanitizer: DomSanitizer) {
    const renderer = new Renderer();
    renderer.code = MarkdownComponent.highlightCode;
    this.md = setOptions({ renderer });
  }

  /**
   * Implement highlight.js styling of code blocks in the markdown.
   * @param code - code to be highlighted
   * @param language - language syntax to use in highlighting
   */
  static highlightCode(code: string, language: string): string {
    if (!(language && getLanguage(language))) {
      // default language to 'markdown'
      language = 'typescript';
    }
    const result = highlight(language, code).value;
    return `<code class="hljs ${language}">${result}</code>`;
  }

  /**
   * Parse markdown and sanitize the result.
   * @param unsafeInput - markdown from database
   */
  markdownToSafeHtml(unsafeInput: string): SafeHtml {
    const html = this.md(unsafeInput.trim());
    const safeHtml = sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }

  /**
   * Set this.data to parsed and sanitized markdown.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes && !!changes.text && changes.text.currentValue) {
      this.data = this.markdownToSafeHtml(changes.text.currentValue);
    }
  }

}
